'use strict';

angular.module('me').directive('drawer', ['$animate', '$backdrop', '$compile', '$drawer', '$media', '$q',
function ($animate, $backdrop, $compile, $drawer, $media, $q) {
  return {
    link: function (scope, element, attrs) {
      var parent = element.parent();
      var sibling = element.previous();
      
      var open = false;
      var locked = false;
      
      element.ready(function () {
        element.addClass('drawer');
      });
      
      function lockDrawer() {
        if(locked) {
          return;
        }
        
        element.addClass('locked');
        
        if(!open) {
          $compile(element.children())(scope);
          $animate.enter(element, parent, sibling).finally(scope.$apply());
        }
        
        else {
          $backdrop.leave().then(function () {
            $backdrop.off('click');
          }).finally(scope.$apply());
        }
        
        locked = true;
      }
      
      function unlockDrawer() {
        if(!locked) {
          return;
        }
        
        if(open) {
          $backdrop.enter().then(function () {
            $backdrop.on('click', closeDrawer);
          }).finally(scope.$apply());
          element.removeClass('locked');
        }
        
        else {
          $animate.leave(element).then(function () {
            element.removeClass('locked');
          }).finally(scope.$apply());
        }
        
        locked = false;
      }
      
      function closeDrawer() {
        if(!open || locked) {
          return;
        }
        
        $q.all($animate.leave(element), $backdrop.leave()).then(function () {
          $backdrop.off('click');
          open = false;
        });
      }
      
      function openDrawer() {
        if(open || locked) {
          return;
        }
        
        $compile(element.children())(scope);
        $q.all($animate.enter(element, parent, sibling), $backdrop.enter()).then(function () {
          $backdrop.on('click', closeDrawer);
          open = true;
        });
      }
      
      function toggleDrawer() {
        if(open) {
          closeDrawer();
        } else {
          openDrawer();
        }
      }
      
      if(attrs.lockOpen) {
        var mediaQuery = window.matchMedia('(min-width: ' + $media[attrs.lockOpen] +')');
        
        if(!mediaQuery.matches) {
          element.remove();
        } else {
          element.addClass('locked');
          locked = true;
        }
        
        mediaQuery.addListener(function(query) {
          if(query.matches) {
            lockDrawer();
          } else {
            unlockDrawer();
          }
        });
      }
      
      else {
        element.remove();
      }
      
      $drawer.register(element.prop('id'), {
        'close': closeDrawer,
        'open': openDrawer,
        'toggle': toggleDrawer
      });
    }
  };
}])

.animation('.drawer', ['$animate', function ($animate) {
  return {
    enter: function (element, done) {
      if(element.prop('id') === 'left') {
        $animate.animate(element, {'margin-left': '-' + element.prop('clientWidth') + 'px'}, {'margin-left': '0'}).then(done);
      } else {
        $animate.animate(element, {'margin-right': '-' + element.prop('clientWidth') + 'px'}, {'margin-right': '0'}).then(done);
      }
    },
    leave: function (element, done) {
      if(element.prop('id') === 'left') {
        $animate.animate(element, {}, {'margin-left': '-' + element.prop('clientWidth') + 'px'}).then(done);
      } else {
        $animate.animate(element, {}, {'margin-right': '-' + element.prop('clientWidth') + 'px'}).then(done);
      }
    }
  };
}]);