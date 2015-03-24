'use strict';

angular.module('me').factory('$backdrop', ['$animate', function ($animate) {

  var backdrop = angular.element('<backdrop></backdrop>');

  return {
    
    enter: function () {
      return $animate.enter(backdrop, document.body);
    },
    
    leave: function () {
      return $animate.leave(backdrop);
    },
    
    off: function (event, callback) {
      backdrop.off(event, callback);
    },
    
    on: function (event, callback) {
      backdrop.on(event, callback);
    },
    
    one: function (event, callback) {
      backdrop.one(event, callback);
    }
  };
}]);