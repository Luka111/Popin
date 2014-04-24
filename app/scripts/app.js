'use strict';

angular
  .module('clickMeApp', [
    'Popin',
    'Keyboard',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'GameController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).controller('GameController',function($timeout, popinService,KeyboardService){
    this.popin = popinService;
    this.gameInit1 = false;
    this.prepareForGame = false;
    this.gameStarts = false;
    this.gameEnds = false;
    this.numberChoice = -1;

    //Timeout functions
    //...

    this.comboTicking = function(combo){
      var t = this;
      var myCombo = combo;
      var worker = function(){
        if(myCombo !== t.combo){
          return;
        }
        if(t.comboTimeLeft > 0){
          t.comboTimeLeft -= 1 ;
          $timeout(worker,1000);
        }else{
          t.combo = 0;
          t.comboTimeLeft = 0;
          return;
        }
      };
      return worker;
    };

    this.prepareGameTicking = function(){
      var t = this;
      var worker = function(){
        if(t.prepareTimeLeft > 0){
          t.prepareTimeLeft -= 1;
          $timeout(worker,1000);
        }else{
          t.prepareForGame = false;
          t.newGame();
          return;
        }
      };
      return worker;
    };

    this.gameTicking = function(){
      var t = this;
      var worker = function(){
        if(t.gameTimeLeft > 0){
          t.gameTimeLeft -= 1;
          $timeout(worker,1000);
        }else{
          t.gameStarts = false;
          t.gameEnds = true;
          t.popin.disablePopinWorking();
          return;
        }
      };
      return worker;
    };

    //...

    this.calculateBonusPoints = function(){
      
    };

    this.collectMe = function(idString){
      var idInt = parseInt(idString) - 1;
      if ((this.numberChoice === -1) || (this.popin.getAllowToPlay(idInt) === false)){
        return;
      }
      var result = this.popin.checkValidation(idInt,this.numberChoice);
      this.score += result;
      if (result>0) { 
        this.inRow ++;
        this.combo ++;
        this.calculateBonusPoints();
        this.comboTimeLeft = 5; //sec
        var doTimeout = this.comboTicking(this.combo);
        doTimeout();
      }else{
        this.inRow = 0;
        this.combo = 0;
        this.comboTimeLeft = 0;
      }
      this.popin.disableCollectMe(idInt);
    };

    this.pickParity = function(choice){
      this.numberChoice = choice;
      if (choice === 1){
        this.numberChoiceString = 'Odd';
      }else{
        this.numberChoiceString = 'Even';
      }
      this.gameInit1 = false;
      this.prepareTimeLeft = 5; //sec
      this.prepareForGame = true;
      var doTimeout = this.prepareGameTicking();
      doTimeout();
    };

    this.newGame = function(){
      this.gameStarts = true;
      this.popin.initCollector();
      this.gameTimeLeft = 60; //sec
      var doTimeout = this.gameTicking();
      doTimeout();
    };

    this.initGame = function(){
      KeyboardService.init();
      this.gameEnds = false;
      this.gameInit1 = true;
      this.score = 0;
      this.inRow = 0;
      this.combo = 0;
      this.numberChoice = -1;
      this.startGame();
    };

    this.startGame = function(){
      var self = this;
      KeyboardService.on(function(key){
        self.collectMe(key);
      });
    };

    this.initGame();

  });
