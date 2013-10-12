'use strict';

angular.module('planningPokerApp', ['firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/games/index.html',
        controller: 'MainCtrl'
      })
      .when('/games/new', {
        templateUrl: 'views/games/new.html',
        controller: 'MainCtrl'
      })
      .when('/games/:gid', {
        templateUrl: 'views/games/view.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'MainCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/account/settings.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
