'use strict';

angular.module('planningPokerApp')
  .controller('MainCtrl', function ($rootScope, $scope, $location, $routeParams, angularFireAuth, angularFire, angularFireCollection) {
    
    // Config
    var URL = 'https://pzfqrq7kjy.firebaseio.com';
    
    // Initialize Firebase
    var ref = new Firebase(URL);
    
    // Authenticated
    $scope.authenticated = false;
    
    // Settings
    $scope.settings = {
      fullname: null,
      location: null,
      deck: 'suit1'
    };
    
    // Games
    $scope.games = angularFireCollection(ref.child('games'));
    
    // Game
    if ($routeParams.gid) {
      angularFire(ref.child('/games/' + $routeParams.gid), $scope, 'game');
    }
    
    // Initialize FireAuth
    angularFireAuth.initialize(ref, {scope: $scope, name: 'user'});
    
    // Login events
    $scope.$on("angularFireAuth:login", function(evt, user) {
      // User logged in.
      console.log('User logged in');
      console.log(user, $scope.authenticated);
      if (user) {
        $rootScope.user = user;
        $scope.authenticated = true;
      }
      if ($location.path() === '/login') {
        $location.path('/');
      }
    });
    
    // Logout events
    $scope.$on("angularFireAuth:logout", function(evt) {
      // User logged out.
      console.log('User logged out');
      $rootScope.user = null;
      $scope.user = null;
      if ($scope.authenticated) {
        $scope.authenticated = false;
        $location.path('/');
      }
    });
    
    // Auth error events
    $scope.$on("angularFireAuth:error", function(evt, err) {
      // There was an error during authentication.
      $scope.auth.error = error;
      console.log(error);
    });
    
    // Fetch user data when autheticated
    $scope.$watch('authenticated', function() {
      console.log('is auth:' + $scope.authenticated);
      if ($scope.authenticated) {
        // Set settings
        angularFire(ref.child('/users/' + $scope.user.id), $scope, 'settings');
      }
    });
    
    // Update settings
    $scope.saveSettings = function() {
      console.log('Saving settings');
      ref.child('/users/' + $scope.user.id).set($scope.settings, function(error) {
        if (error) {
          console.log('Data could not be saved.' + error);
        } else {
          console.log('Data saved successfully.');
        }
      });
    };
    
    // Create game
    $scope.createGame = function() {
      console.log('Creating game...');
      // Convert stories
      // @todo make it accept structured
      var stories = [],
          game = angular.copy($scope.game);
      angular.forEach(game.stories.split('\n'), function(story) {
        stories.push({name: story});
      });
      game.stories = stories;
      game.status = 'active';
      game.created = new Date().getTime();
      $scope.games.add(game, function() {
        console.log('Created game...');
        $scope.game = null;
        $location.path('/games/' + $scope.games[$scope.games.length-1].$id);
        $scope.$apply();
      });
    };
    
    // Update game
    $scope.updateGame = function(id) {
      //$scope.games.
    };
    
    // Remove game
    $scope.removeGame = function(id) {
      $scope.games.remove(id, function() {
        console.log('Removed game: '+ id);
      });
    };
    
    // Login
    $scope.login = function() {
      var login = angularFireAuth.login(
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
            $scope.auth.error = error;
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
