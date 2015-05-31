'use strict';

angular.module('me').directive('ripple', ['$animate', function ($animate) {
  return {
    link: function (scope, element, attrs) {
      element.css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      
      var style = window.getComputedStyle(element.getDomElement());
      
      function getInk(event) {
        var ink = angular.element('<ink></ink>');
        var rect = element.getDomElement().getBoundingClientRect();
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
      
      if(element.getDomElement().hasOwnProperty('ontouchstart')) {
        
        var touchMove;
        
        element.on('touchstart', function (event) {
          touchMove = false;
          
          var ink = getInk(event);
          
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
        element.on('mousedown', function (event) {
          showInk(getInk(event));
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
    link: function (scope, element, attrs) {
      if(attrs.noInk === undefined) {
        ripple.link.apply(ripple, arguments);
      }
    }
  };
}])

.directive('a', ['rippleDirective', function (rippleDirective) {
  var ripple = rippleDirective.first();
  return {
    link: function (scope, element, attrs) {
      if(attrs.noInk === undefined && element.hasClass('button')) {
        ripple.link.apply(ripple, arguments);
      }
    }
  };
}])

.directive('tab', ['rippleDirective', function (rippleDirective) {
  var ripple = rippleDirective.first();
  return {
    link: function (scope, element, attrs) {
      if(attrs.noInk === undefined) {
        ripple.link.apply(ripple, arguments);
      }
    }
  };
}]);