'use strict';

angular.module('me').directive('fallback', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('error', function () {
        element.attr("src", attrs.fallback);
      });
    }
  }
});