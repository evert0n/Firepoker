'use strict';

angular.module('planningPokerApp', ['firebase'])
  .config(function ($routeProvider) {
    $routeProvider
     .when('/', {
        templateUrl: 'views/main.html',
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
