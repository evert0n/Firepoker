'use strict';

angular.module('planningPokerApp')
  .controller('AccountCtrl', function ($scope, fire) {
    console.log('works');
    var ref = new Firebase('https://pzfqrq7kjy.firebaseio.com/');
    angularFireAuth.initialize(ref, {scope: $scope, name: 'user'});
    console.log($scope.user);
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
