'use strict';

angular.module('me').directive('icon', function () {
  return {
    replace: true,
    templateUrl: function (element, attrs) {
      if(attrs.src) {
        return attrs.src;
      }
    },
    compile: function (element) {
      element.addClass('icon');
    }
  };
});