'use strict';

describe('Controller: GamesCtrl', function () {

  // load the controller's module
  beforeEach(module('planningPokerApp'));

  var GamesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamesCtrl = $controller('GamesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
