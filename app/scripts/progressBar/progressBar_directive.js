'use strict';
angular.module('clickMeApp').directive('progressbar',function(){
  return{
    restrict: 'A',
    scope:{
      current: '='
    },
    link: function(scope,element){
      scope.$watch('current',function(){
        element.css('width',scope.current/60 *100 + '%');
      });
    }
  };
});
