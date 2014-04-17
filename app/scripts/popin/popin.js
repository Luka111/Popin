'use strict';
angular.module('Popin',[]).service('popinService',function(){

  this.updatePopinCollection = function(id){
    this.collector[id].tickTimeout = 1000 + parseInt(Math.random()*1000);
    this.collector[id].magicNumber = parseInt(Math.random()*10);
    this.collector[id].allowToPlay = true; 
  };
 
  this.disableCollectMe = function (id){
    this.collector[id].allowToPlay = false;
  };
  
  this.getAllowToPlay = function(id){
    return this.collector[id].allowToPlay;
  };
  
  this.checkValidation = function(id,numberChoice){
    if (this.collector[id].magicNumber % 2 === numberChoice % 2){
      return 10;
    }else{
      return -10;
    }
  };

  this.initCollector = function(){
    this.collector = [];
    for(var i=0; i<9; i++){
      this.collector[i] = {};
      this.updatePopinCollection(i);
    }
  };

});
