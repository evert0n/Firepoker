'use strict';

describe('Controller: MainCtrl', function () {

  // Load the controller's module
  beforeEach(module('firePokerApp'));
  beforeEach(module('firebase'));
  beforeEach(module('ngCookies'));
  
  // Initialize objects
  var MainCtrl,
      scope,
      rootScope,
      location,
      browser,
      firebase;
      
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector, $location, $browser, angularFire) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    location = $location;
    browser = $browser;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location
    });
  }));
  
  // Valid regex match for UUID's
  var VALID_UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; 
  
  // Current valid/available card decks
  var VALID_CARD_DECKS = [
    [0, 1, 2, 4, 8, 16, 32, 64, 128, '?'],
    [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?']
  ];
  
  // Firebase URL
  var FIREBASE_URL = 'https://pzfqrq7kjy.firebaseio.com';
  
  // Set a test game for tests
  var setTestGame = function() {
    scope.game = {
      "created" : 1382370198911,
      "participants" : {
        "558aa568-461f-9bf5-fdc8-c4e5aab51b92" : {
          "online" : true,
          "fullname" : "Chrome",
          "id" : "558aa568-461f-9bf5-fdc8-c4e5aab51b92"
        },
        "37b9be39-2598-6e05-0295-33490ef60ad7" : {
          "online" : true,
          "fullname" : "Safari",
          "id" : "37b9be39-2598-6e05-0295-33490ef60ad7"
        },
        "eb5c1da2-2cdd-b89f-9369-ea532d1a9b27" : {
          "online" : true,
          "fullname" : "Firefox",
          "id" : "eb5c1da2-2cdd-b89f-9369-ea532d1a9b27"
        },
        "257d4b3a-7972-6552-03f0-ad49b6518992" : {
          "online" : 1382370366666,
          "fullname" : "Offline Estimator",
          "id" : "257d4b3a-7972-6552-03f0-ad49b6518992"
        }
      },
      "estimate" : {
        "results" : [ 
          {
            "points" : 8,
            "user" : {
              "fullname" : "Firefox",
              "id" : "eb5c1da2-2cdd-b89f-9369-ea532d1a9b27"
            }
          },
          {
            "points" : 8,
            "user" : {
              "fullname" : "Safari",
              "id" : "37b9be39-2598-6e05-0295-33490ef60ad7"
            }
          },
          {
            "points" : 16,
            "user" : {
              "fullname" : "Chrome",
              "id" : "558aa568-461f-9bf5-fdc8-c4e5aab51b92"
            }
          }
        ],
        "points" : 0,
        "title" : "As a/an user I would like to play planning poker with my team so that we can estimate our user stories",
        "endedAt" : false,
        "status" : "active",
        "startedAt" : 1382370236239,
        "id" : 0
      },
      "owner" : {
        "fullname" : "Chrome",
        "id" : "558aa568-461f-9bf5-fdc8-c4e5aab51b92"
      },
      "stories" : [
        {
          "results" : false,
          "points" : 0,
          "title" : "As a/an user I would like to play planning poker with my team so that we can estimate our user stories",
          "endedAt" : false,
          "status" : "active",
          "startedAt" : 1382370236239,
          "id" : 0
        }
      ],
      "name" : "Demo",
      "status" : "active",
      "deck" : 0
    }
  };
  
  it('should set an user id (UID) if empty', function() {
    expect(scope.fp.user.id).toMatch(VALID_UUID);
  });
  
  it('should set a group id (GID) if empty', function() {
    expect(scope.fp.gid).toMatch(VALID_UUID);
  });
  
  it('should return false if path equals to `/` when calling isLandingPage()', function() {
    location.path('/');
    expect(rootScope.isLandingPage()).toBe(false);
  });
  
  it('should return true if path equals to `/` when calling isLandingPage()', function() {
    location.path('/games');
    expect(rootScope.isLandingPage()).toEqual(true);
  });
  
  it('should redirect to create a new game with a GID', function() {
    
  });
  
  // it('should redirect to set fullname if empty', function() {
  //   
  // });
  // 
  // it('should load the game and set presence', function() {
  //   
  // });
  // 
  // it('should create games', function() {
  //   // scope.createGame();
  // });
  // 
  // it('should allow add structured stories to the game', function() {
  //   
  // });
  // 
  // it('should allow add free-form stories to the game', function() {
  //   
  // });
  // 
  // it('should set the latest added story as the active story in the round if none set', function() {
  //   
  // });
  // 
  // it('should allow users to set stories for estimating', function() {
  //   
  // });
  // 
  // it('should allow the game owner to delete stories', function() {
  //   
  // });
  // 
  // it('should allow users to set their full names', function() {
  //   
  // });
  
  it('should calculate the results average points', function() {
    setTestGame();
    expect(scope.getResultsAverage()).toBe(11);
  });
  
  it('should give the total number of active participants in the game', function() {
    setTestGame();
    expect(scope.totalOfOnlineParticipants()).toBe(3);
  });
  
  it('should allow the game owner to accept the round', function() {
    setTestGame();
    var now = new Date().getTime() - 1;
    var idx = scope.game.estimate.id;
    scope.newEstimate = { points: 10 };
    scope.acceptRound();
    expect(scope.game.stories[idx].endedAt).toBeGreaterThan(now);
    expect(scope.game.stories[idx].status).toBe('closed');
    expect(scope.game.estimate).toBe(false);
  });
  
  it('should allow the game owner to play again the round', function() {
    setTestGame();
    scope.playAgain();
    expect(scope.game.estimate.results).toEqual([]);
  });
  
  it('should allow the game owner to reset the round', function() {
    setTestGame();
    var idx = scope.game.estimate.id;
    scope.resetRound();
    expect(scope.game.estimate).toBe(false);
    expect(scope.game.stories[idx].startedAt).toBe(false);
    expect(scope.game.stories[idx].endedAt).toBe(false);
    expect(scope.game.stories[idx].status).toBe('queue');
  });
  
  it('should allow the game owner to reveal the cards in the round', function() {
    setTestGame();
    scope.revealCards();
    expect(scope.game.estimate.status).toBe('reveal');
  });
  
  it('should set a card deck array that can be used in games', function() {
    expect(scope.decks).toEqual(VALID_CARD_DECKS);
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
  
  it('should set a default `disablePlayAgainAndRevealButtons` value', function() {
    expect(scope.disablePlayAgainAndRevealButtons).toBe(false);
  });
  
  it('should set a default `showCards` value', function() {
    expect(scope.showCards).toBe(false);
  });
  
  it('should set `showCardDeck` to false if the user already estimated the story', function() {
    setTestGame();
    scope.game.estimate.results[0].user.id = scope.fp.user.id;
    scope.setShowCardDeck();
    expect(scope.showCardDeck).toBe(false);
  });
  
  it('should set `showSelectEstimate` to true if the user is the game owner', function() {
    setTestGame();
    scope.game.owner.id = scope.fp.user.id;
    scope.setShowSelectEstimate();
    expect(scope.showSelectEstimate).toBe(true);
  });
  
  it('should set `newEstimate` average points', function() {
    setTestGame();
    scope.setNewEstimate();
    expect(scope.newEstimate).toEqual({ points: scope.getResultsAverage() });
  });
  
  it('should set `disablePlayAgainAndRevealButtons` to true if the estimate results are empty', function() {
    setTestGame();
    scope.game.estimate.results = [];
    scope.setDisablePlayAgainAndRevealButtons();
    expect(scope.disablePlayAgainAndRevealButtons).toBe(true);
  });
  
  it('should set `disablePlayAgainAndRevealButtons` to true if the estimate results is not set', function() {
    setTestGame();
    delete scope.game.estimate.results;
    scope.setDisablePlayAgainAndRevealButtons();
    expect(scope.disablePlayAgainAndRevealButtons).toBe(true);
  });
  
  it('should set `showCards` to true if the current round status is equal to `reveal`', function() {
    setTestGame();
    scope.game.estimate.status = 'reveal';
    scope.setShowCards();
    expect(scope.showCards).toBe(true);
  });
  
  it('should set `showCards` to true if all participants estimated the current round', function() {
    setTestGame();
    scope.setShowCards();
    expect(scope.showCards).toBe(true);
  });
  
});
