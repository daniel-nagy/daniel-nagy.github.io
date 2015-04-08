'use strict';

angular.module('me').factory('$backdrop', ['$animate', function ($animate) {

  var backdrop = angular.element('<backdrop></backdrop>');

  return {
    
    enter: function () {
      var animation = $animate.enter(backdrop, document.body);
      
      animation.then(function () {
        if(backdrop.first().hasOwnProperty('ontouchmove')) {
          // prevent scroll in mobile safari
          backdrop.on('touchmove', function (event) {
            event.preventDefault();
          });
        }
      });
      
      return animation;
    },
    
    leave: function () {
      return $animate.leave(backdrop);
    },
    
    off: function (event) {
      backdrop.off(event);
    },
    
    on: function (event, handler) {
      backdrop.on(event, handler);
    },
    
    one: function (event, handler) {
      backdrop.one(event, handler);
    }
  };
}]);