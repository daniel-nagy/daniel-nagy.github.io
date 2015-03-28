'use strict';

angular.module('me').directive('ripple', ['$animate', function ($animate) {
  return {
    link: function (scope, element, attrs) {
      element.css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      
      var style = window.getComputedStyle(element[0]);
      
      var eventName = element.first().hasOwnProperty('ontouchstart') ? 'touchstart' : 'mousedown';
      
      element.on(eventName, function (event) {
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
}])

.directive('button', ['rippleDirective', function (rippleDirective) {
  var ripple = rippleDirective.first();
  return {
    link: function () {
      ripple.link.apply(ripple, arguments);
    }
  };
}])

.directive('a', ['rippleDirective', function (rippleDirective) {
  var ripple = rippleDirective.first();
  return {
    link: function () {
      ripple.link.apply(ripple, arguments);
    }
  };
}]);