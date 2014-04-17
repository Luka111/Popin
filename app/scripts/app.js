'use strict';

angular
  .module('clickMeApp', [
    'Popin',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
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
  }).controller('GameController',function(popinService){
    this.popin = popinService;
    this.collectMe = function(idString){
      var idInt = parseInt(idString) - 1;
      if ((this.numberChoice === -1) || (this.popin.getAllowToPlay(idInt) === false)){
        return;
      }
      var result = this.popin.checkValidation(idInt,this.numberChoice);
      this.score += result;
      this.popin.disableCollectMe(idInt);
    };
    this.pickParity = function(choice){
      this.numberChoice = choice;
      if (choice === 1){
        this.numberChoiceString = 'Odd';
      }else{
        this.numberChoiceString = 'Even';
      }
    };
    this.newGame = function(){
      this.numberChoice = -1;
      this.score = 0;
      this.popin.initCollector();
    };
    this.newGame();
  });
