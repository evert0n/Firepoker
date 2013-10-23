'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('firePokerApp'));
  beforeEach(module('firebase'));
  beforeEach(module('ngCookies'));

  var UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; 

  var MainCtrl,
      scope,
      rootScope,
      location,
      firebase;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $cookieStore, $location, angularFire) {
    location = $location;
    scope = $rootScope.$new();
    rootScope = $rootScope;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location
    });
  }));

  // it('should set URL constant with a firebaseIO.com endpoint', function() {
  //   expect(scope.URL).toBe('https://pzfqrq7kjy.firebaseio.com');
  // });

  // it('should set an empty object for fp if can not set in a cookie', function() {
  //   expect(scope.fp).toBe({});
  // });
  
  it('should set an user id (UID) if empty', function() {
    expect(scope.fp.user.id).toMatch(UUID);
  });
  
  it('should set a group id (GID) if empty', function() {
    expect(scope.fp.gid).toMatch(UUID);
  });
  
  it('should set `showNavBar` to FALSE in the app root (/) path', function() {
    // location.path('/');
    // expect(rootScope.showNavbar).toEqual(false);
  });
  
  it('should set `showNavBar` to TRUE in any location other than the app root (/) path', function() {
    // location.path('/games');
    // expect(rootScope.showNavbar).toBe(true);
  });
  
  it('should redirect to create a new game with a GID', function() {
    // location.path('/games/new');
  });
  
  it('should redirect to set fullname if empty', function() {
    
  });
  
  it('should load the game and set presence', function() {
    
  });
  
  it('should create games', function() {
    // scope.createGame();
  });
  
  it('should add structured stories to the game', function() {
    
  });
  
  it('should add free-form stories to the game', function() {
    
  });
  
  it('should set the latest added story as the active story in the round if none set', function() {
    
  });
  
  it('should allow users to set stories for estimating', function() {
    
  });
  
  it('should allow users to delete stories in the queue', function() {
    
  });
  
  it('should allow users to set their full names', function() {
    
  });
  
  it('should calculate the results average points', function() {
    
  });
  
  it('should give the total number of active participants in the game', function() {
    
  });
  
  it('should allow the game owner to accept the round', function() {
    
  });
  
  it('should allow the game owner to play again the round', function() {
    
  });
  
  it('should allow the game owner to reset the round', function() {
    
  });
  
  it('should allow the game owner to reveal the cards in the round', function() {
    
  });
  
  it('should set a card deck array that can be used in games', function() {
    var decks = [
      [0, 1, 2, 4, 8, 16, 32, 64, 128, '?'],
      [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?']
    ];
    expect(scope.decks).toEqual(decks);
  });
  
  it('should set a default `newGame` value', function() {
    expect(scope.newGame).toEqual({deck: 0});
  });
  
  it('should set a default `showCardDeck` value', function() {
    expect(scope.showCardDeck).toBe(true);
  });
  
  it('should set a default `showSelectEstimate` value', function() {
    expect(scope.showSelectEstimate).toBe(false);
  });
  
  it('should set a default `showAddStory` value', function() {
    expect(scope.showAddStory).toBe(false);
  });
  
  it('should set a default `disablePlayAgainAndRevealButtons` value', function() {
    expect(scope.disablePlayAgainAndRevealButtons).toBe(false);
  });
  
  it('should set a default `showCards` value', function() {
    expect(scope.showCards).toBe(false);
  });
  
  it('should set `showCardDeck` to false if the user already estimated the story', function() {
    
  });
  
  it('should set `showSelectEstimate` to true if the user is the game owner', function() {
    
  });
  
  it('should set `newEstimate` average points', function() {
    
  });
  
  it('should set `showAddStory` to true if the user is the game owner', function() {
    
  });
  
  it('should set `showCards` to true if the current round status is equal to `reveal`', function() {
    
  });
  
  it('should set `showCards` to true if all participants estimated the current round', function() {
    
  });
  
});
