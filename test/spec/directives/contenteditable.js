'use strict';

describe('Directive: contentEditable', function () {

  // load the directive's module
  beforeEach(module('firepokerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<content-editable></content-editable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the contentEditable directive');
  }));
});
