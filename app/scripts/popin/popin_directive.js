'use strict';
angular.module('Popin').directive('popin',function($timeout){
  return {
    restrict:'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'scripts/popin/popin.html',
    link: function(scope,elements,attrs){
      (function tick(){
        var ngModel = scope.ngModel;
        scope.id = parseInt(attrs.id) - 1;
        ngModel.updatePopinCollection(scope.id);
        $timeout(tick,ngModel.collector[scope.id].tickTimeout);
      })();
    }
  };
});
