'use strict';

angular.module('me').directive('marked', ['$marked', '$sanitize', function ($marked, $sanitize) {

  function highlight(code) {
    if(code.className) {
      Prism.highlightElement(code, false, null);
    }
  }

  return {
    link: function (scope, element, attrs) {
      
      if(attrs.marked) {
        element.html($sanitize($marked(attrs.marked)));
      }
      
      element.ready(function () {
        element.find('a').attr('no-ink', '').attr('target', '_blank');
        angular.forEach(element.find('code'), highlight);
      });
    }
  };
}]);