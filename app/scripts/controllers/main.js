'use strict';

angular.module('planningPokerApp')
  .controller('MainCtrl', function ($rootScope, $scope, $location, angularFireAuth, angularFire, angularFireCollection) {
    
    // Config
    var URL = 'https://pzfqrq7kjy.firebaseio.com';
    
    // Initialize Firebase
    var ref = new Firebase(URL);
    
    // User ID
    $scope.uid = 0;
    
    // Game ID
    $scope.gid = 0;
    
    // Initialize FireAuth
    angularFireAuth.initialize(
      ref,
      {
        scope: $scope,
        name: 'user',
        callback: function(err, user) {
          console.log(err);
          console.log(user);
          $rootScope.user = user;
          $scope.uid = user.id;
        }
      }
    );
    
    // Auth events
    $scope.$on("angularFireAuth:login", function(evt, user) {
      // User logged in.
      console.log('Logged in');
      console.log(evt);
      console.log(user);
      //$location.path('/');
    });
    $scope.$on("angularFireAuth:logout", function(evt) {
      // User logged out.
      console.log(evt);
    });
    $scope.$on("angularFireAuth:error", function(evt, err) {
      // There was an error during authentication.
      $scope.auth.error = error;
      console.log(error);
    });
    
    // Settings
    $scope.settings = angularFireCollection(new Firebase(URL + '/users/' + $scope.uid + '/settings'));
    
    // Games
    $scope.games = angularFireCollection(new Firebase(URL + '/games/' + $scope.uid));
    
    
    // Login
    $scope.login = function() {
      console.log('Login...');
      angularFireAuth.login(
        'password',
        {
          email: $scope.user.email,
          password: $scope.user.password,
          rememberMe: $scope.user.rememberMe
        }
      );
    };
    
    // Logout
    $rootScope.logout = function() {
      angularFireAuth.logout();
    };
    
    // Signup
    $scope.signup = function() {
      angularFireAuth.createUser(
        $scope.user.email,
        $scope.user.password,
        function(error, user) {
          if (error) {
            $scope.login.error = error;
            console.log(error);
          } else if (user) {
            console.log(user);
          }
        }
      );
    };
    
    // Delete account
    $scope.deleteAccount = function() {
      
    }
    
    // Card deck options
    $scope.card_decks = {
      suit1: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'],
      suit2: [0, 1, 2, 4, 8, 16, 32, 64, 128, '?']
    };
    
  });
