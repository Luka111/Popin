'use strict';
angular.module('Popin').directive('popin',function($timeout){
  return {
    restrict:'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'scripts/popin/popin.html',
    /*link: function(scope,elements,attrs){
      scope.id = parseInt(attrs.id) - 1;
      (function tick(){
        var ngModel = scope.ngModel;
        ngModel.updatePopinCollection(scope.id);
        $timeout(tick,ngModel.collector[scope.id].tickTimeout);
      })();
    }*/
    link: function(scope,elements,attrs){
      scope.id = parseInt(attrs.id) - 1;
      var doTimeout = (function(){
        var _scope = scope;
        var ngModel = scope.ngModel;
        var worker = function(){
          var timeLeft = ngModel.collector[scope.id].tickTimeout;
          console.log('Vremena ostalo:',timeLeft);
          if (timeLeft > 0){
            ngModel.collector[scope.id].tickTimeout -= 100;
            $timeout(worker,100);
          }else{
            console.log('Zavrsio timer! Moj id: ',_scope.id);
            ngModel.updatePopinCollection(_scope.id);
            console.log('NOVI TIMEOUT!!! - ',ngModel.collector[_scope.id].tickTimeout);
            doTimeout();
          }
        };
        return worker;
      })();
      doTimeout();
    }
  };
});
