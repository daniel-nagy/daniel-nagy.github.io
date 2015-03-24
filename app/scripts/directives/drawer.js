'use strict';

angular.module('me').directive('drawer', ['$backdrop', '$drawer', '$media', function ($backdrop, $drawer, $media) {
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
      
      function close() {
        scope.$apply(function () {
          show = false;
          $backdrop.leave();
        });
      }
      
      function open() {
        show = true;
        $backdrop.enter();
        $backdrop.one('click', close);
      }
      
      function toggle() {
        if (show) { close(); } else { open(); }
      }
      
      $drawer.register(element.prop('id'), {
        'close': close,
        'open': open,
        'toggle': toggle
      });
    }
  };
}]);