'use strict';

angular.module('me').directive('drawer', ['$animate', '$backdrop', '$drawer', '$media', '$q', function ($animate, $backdrop, $drawer, $media, $q) {
  return {
    link: function (scope, element, attrs) {
      var parent = element.parent();
      var sibling = element.previous();
      
      var open = false;
      var locked = false;
      
      function animateOpen() {
        var animation;
        
        if(attrs.id === 'left') {
          parent.prepend(element);
          animation = $animate.animate(element, {'margin-left': '-' + element.prop('clientWidth') + 'px'}, {'margin-left': '0'});
        } else {
          sibling.after(element);
          animation = $animate.animate(element, {'margin-right': '-' + element.prop('clientWidth') + 'px'}, {'margin-right': '0'});
        }
        
        return animation;
      }
      
      function animateClose() {
        var animation;
        
        if(attrs.id === 'left') {
          animation = $animate.animate(element, {'margin-left': '0'}, {'margin-left': '-' + element.prop('clientWidth') + 'px'});
        } else {
          animation = $animate.animate(element, {'margin-right': '0'}, {'margin-right': '-' + element.prop('clientWidth') + 'px'});
        }
        
        return animation;
      }
      
      function lockDrawer() {
        if(locked) {
          return;
        }
        
        element.addClass('locked');
        
        if(!open) {
          animateOpen().finally(scope.$apply());
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
          element.removeClass('locked');
          $backdrop.enter().then(function () {
            $backdrop.on('click', closeDrawer);
          }).finally(scope.$apply());
        }
        
        else {
          animateClose().then(function () {
            element.detach().removeClass('locked');
          }).finally(scope.$apply());
        }
        
        locked = false;
      }
      
      function closeDrawer() {
        if(!open || locked) {
          return;
        }
        
        $q.all([animateClose(), $backdrop.leave()]).then(function () {
          element.detach()
          $backdrop.off('click');
          open = false;
        }).finally(scope.$apply());
      }
      
      function openDrawer() {
        if(open || locked) {
          return;
        }
        
        $q.all([animateOpen(), $backdrop.enter()]).then(function () {
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
          element.detach();
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
        element.detach();
      }
      
      $drawer.register(attrs.id, {
        'close': closeDrawer,
        'open': openDrawer,
        'toggle': toggleDrawer
      });
    }
  };
}]);