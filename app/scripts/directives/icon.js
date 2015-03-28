'use strict';

angular.module('me').directive('icon', ['$http', '$interpolate', '$templateCache', function ($http, $interpolate, $templateCache) {
  return {
    link: function(scope, element, attrs) {
      
      var url = $interpolate(attrs.src)(scope);
      
      $http.get(url, {cache: $templateCache}).success(function (template) {
        element.append(template);
      });
    }
  };
}]);