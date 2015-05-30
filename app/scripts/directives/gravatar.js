'use strict';

angular.module('me').directive('gravatar', ['$md5', function ($md5) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      
      if(attrs.email) {
        $md5(attrs.email).success(function (hash) {
          element.attr('src', 'http://www.gravatar.com/avatar/' + hash + '?s=60&d=404');
        });
      } else {
        element.attr('src', attrs.fallback);
      }
      
      element.on('error', function () {
        element.attr('src', attrs.fallback);
      });
    }
  };
}]);