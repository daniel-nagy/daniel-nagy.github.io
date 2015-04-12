'use strict';

angular.module('me').directive('icon', ['$http', '$templateCache', '$timeout', function ($http, $templateCache, $timeout) {
  return {
    link: function(scope, element, attrs) {
      attrs.$observe('src', function (url) {
        $http.get(url, {cache: $templateCache}).success(function (template) {
          var ink = element.find('ink');
          if(ink.length) {
            ink.on('animationend webkitAnimationEnd', function () {
              element.html(template);
            });
          } else {
            element.html(template);
          }
        });
      });
    }
  };
}]);