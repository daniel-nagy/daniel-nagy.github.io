'use strict';

angular.module('me').directive('button', ['rippleDirective', function (rippleDirective) {
  
  var ripple = rippleDirective.first();
  
  return {
    link: function () {
      ripple.link.apply(ripple, arguments);
    }
  };
  
}]);