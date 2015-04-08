'use strict';

angular.module('me').directive('drawer', ['$animate', '$backdrop', '$drawer', '$media', '$q', function ($animate, $backdrop, $drawer, $media, $q) {
  return {
    link: function (scope, element, attrs) {
      var parent = element.parent();
      var sibling = element.previous();
      
      var opened = false;
      var locked = false;
      
      function attachDrawer() {
        if(attrs.id === 'left') {
          parent.prepend(element);
        } else {
          sibling.after(element);
        }
      }
      
      function lockDrawer() {
        if(locked) {
          return;
        }
        
        element.addClass('locked').removeClass('unlocked');
        
        if(opened) {
          $backdrop.leave().then($backdrop.off('click')).finally(scope.$apply());
        } else {
          attachDrawer();
          $animate.setClass(element, 'open', 'close').finally(scope.$apply());
        }
        
        locked = true;
      }
      
      function unlockDrawer() {
        if(!locked) {
          return;
        }
        
        if(opened) {
          element.addClass('unlocked').removeClass('locked');
          $backdrop.enter().then($backdrop.on('click', closeDrawer)).finally(scope.$apply());
        }
        
        else {
          $animate.setClass(element, 'close', 'open').then(function () {
            element.detach().addClass('unlocked').removeClass('locked');
          }).finally(scope.$apply());
        }
        
        locked = false;
      }
      
      function closeDrawer() {
        if(!opened || locked) {
          return;
        }
        
        $q.all([$animate.setClass(element, 'close', 'open'), $backdrop.leave()]).then(function () {
          element.detach();
          $backdrop.off('click');
        }).finally(scope.$apply());
        
        opened = false;
      }
      
      function openDrawer() {
        if(opened) {
          return;
        }
        
        attachDrawer();
        $animate.setClass(element, 'open', 'close');
        
        $backdrop.enter().then(function () {
          $backdrop.on('click', closeDrawer);
        });
        
        opened = true;
      }
      
      function toggleDrawer() {
        if(opened) {
          closeDrawer();
        } else {
          openDrawer();
        }
      }
      
      if(attrs.lockOpen) {
        var mediaQuery = $media(attrs.lockOpen);
        
        if(mediaQuery.matches) {
          element.addClass('locked open');
          locked = true;
        } else {
          element.detach().addClass('unlocked close');
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
        element.detach().addClass('unlocked close');
      }
      
      $drawer.register(attrs.id, {
        'close': closeDrawer,
        'open': openDrawer,
        'toggle': toggleDrawer
      });
    }
  };
}]);