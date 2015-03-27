'use strict';

angular.module('me').directive('ripple', ['$animate', function ($animate) {
  return {
    link: function (scope, element, attrs) {
      element.css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      
      var style = window.getComputedStyle(element[0]);
      
      element.on('click', function (event) {
        var ink = angular.element('<ink></ink>');
        var diameter = Math.max(element.prop('clientHeight'), element.prop('clientWidth'));
        
        ink.css({
          'height': diameter + 'px',
          'width': diameter + 'px',
          'top': event.pageY - element.prop('offsetTop') - (diameter / 2) + 'px',
          'left': event.pageX - element.prop('offsetLeft') - (diameter / 2) + 'px',
          'background-color': attrs.inkColor || style.color
        });
        
        $animate.enter(ink, element).then(function () {
          ink.remove();
        }).finally(scope.$apply());
      });
    }
  };
}]);