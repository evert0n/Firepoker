'use strict';

describe('Service: dummyData', function () {

  // load the service's module
  beforeEach(module('planningPokerApp'));

  // instantiate service
  var dummyData;
  beforeEach(inject(function (_dummyData_) {
    dummyData = _dummyData_;
  }));

  it('should do something', function () {
    expect(!!dummyData).toBe(true);
  });

});
