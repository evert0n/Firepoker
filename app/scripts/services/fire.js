'use strict';

angular.module('planningPokerApp')
  .factory('fire', function (angularFireAuth) {
    // Service logic
    // ...

    var fire
    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
