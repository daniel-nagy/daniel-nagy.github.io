'use strict';

angular.module('me').directive('icon', function () {
  return {
    templateUrl: function (element, attrs) {
      if(attrs.src) {
        return attrs.src;
      }
    }
  };
});