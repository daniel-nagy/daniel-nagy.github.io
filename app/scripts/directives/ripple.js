'use strict';

angular.module('me').directive('ripple', ['$animate', function ($animate) {
  return {
    link: function (scope, element, attrs) {
      element.css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      
      var style = window.getComputedStyle(element.first());
      
      function getInk() {
        var ink = angular.element('<ink></ink>');
        var rect = element.first().getBoundingClientRect();
        var diameter = Math.max(rect.height, rect.width);
        
        ink.css({
          'height': diameter + 'px',
          'width': diameter + 'px',
          'top': event.pageY - rect.top - (diameter / 2) + 'px',
          'left': event.pageX - rect.left - (diameter / 2) + 'px',
          'background-color': attrs.inkColor || style.color
        });
        
        return ink;
      }
      
      function showInk(ink) {
        $animate.enter(ink, element).then(function () {
          ink.remove();
        }).finally(scope.$apply());
      }
      
      if(element.first().hasOwnProperty('ontouchstart')) {
        
        var touchMove;
        
        element.on('touchstart', function () {
          touchMove = false;
          
          var ink = getInk();
          
          // cancel if the user is performing a swiping gesture
          setTimeout(function() {
            if(!touchMove) {
              showInk(ink);
            }
          }, 100);
        });
        
        element.on('touchmove', function () {
          touchMove = true;
        });
      }
      
      else {
        element.on('mousedown', function () {
          showInk(getInk());
        });
      }
    }
  };
}])

.directive('scroll', function () {
  return {
    link: function (scope, element) {
      // I'm a little puzzled but attaching to the touchstart event
      // allows the ripple directive to work properly within a scroll
      // element on my iPhone 4
      element.on('touchstart', angular.noop);
    }
  };
})

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