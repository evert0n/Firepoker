'use strict';

angular.module('planningPokerApp')
  .factory('dummyData', function () {

    var meaningOfLife = 42;


    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
