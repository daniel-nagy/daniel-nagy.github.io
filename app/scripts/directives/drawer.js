'use strict';

angular.module('me').directive('drawer', ['$animate', '$drawer', '$media', function ($animate, $drawer, $media) {
  return {
    link: function (scope, element, attrs) {
      
      var mediaQuery;
      var show;
      
      if(attrs.lockOpen) {
        mediaQuery = window.matchMedia('(min-width: ' + $media[attrs.lockOpen] +')');
        mediaQuery.addListener(function() {
          scope.$apply();
        });
      }
      
      scope.show = function () {
        return  mediaQuery.matches || show;
      };
      
      function open() {
        show = true;
        
        $animate.enter('<backdrop></backdrop>', null, element).then(function () {
          element.next().on('click', close);
        });
      }
      
      function close() {
        scope.$apply(function () {
          show = false;
          $animate.leave(element.next());
        });
      }
      
      function toggle() {
        if(scope.open) { close(); } else { open(); }
      }
      
      $drawer.register(element.prop('id'), toggle);
    }
  };
}]);