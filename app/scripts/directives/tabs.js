'use strict';

angular.module('me').directive('tabs', ['$media', '$templateCache', '$timeout', '$window', function ($media, $templateCache, $timeout, $window) {
  return {
    transclude: true,
    template: '<tab-container ng-transclude></tab-container>' +
      '<div class="tab-view" ng-if="template" ng-include="template"></div>',
    link: function (scope, element, attrs) {
      var tabs = element.find('tab');
      var indicator = angular.element('<indicator></indicator>');
      var media = $media('lt-sm');
      
      element.find('tab-container').append(indicator);
      
      angular.forEach(tabs, function(tab, index) {
        if(tab.innerHTML) {
          tab.template = tab.attributes.label.value.toLowerCase() + '.html';
          $templateCache.put(tab.template, tab.innerHTML);
        }
        tab.tabIndex = index;
        tab.innerHTML = tab.attributes.label.value;
      });
      
      function moveIndicator(index) {
        index = index || attrs.active;
        
        indicator.css({
          'left': tabs[index].offsetLeft + 'px',
          'width': tabs[index].clientWidth + 'px'
        });
      }
      
      function activateTab(index) {
        $timeout(function () {
          scope.template = tabs[index].template;
          
          if(scope.template) {
            element.addClass('round-bottom');
          } else {
            element.removeClass('round-bottom');
          }
          
          moveIndicator(index);
        });
      }
      
      function adjustTabWidth() {
        if(media.matches) {
          tabs.css('width', 100 / tabs.length + '%');
        } else {
          tabs.css('width', '');
        }
        
        moveIndicator();
      }
      
      if(!attrs.active) {
        attrs.$set('active', 0);
      }
      
      if(media.matches) {
        adjustTabWidth();
      }
      
      tabs.on('click', function () {
        indicator.addClass('animate');
        attrs.$set('active', this.tabIndex);
      });
      
      indicator.on('transitionend webkitTransitionEnd', function () {
        indicator.removeClass('animate');
      });
      
      attrs.$observe('active', activateTab);
      
      $media('lt-sm').addListener(adjustTabWidth);
      
      $window.addEventListener('resize', function () {
        moveIndicator();
      });
    }
  };
}]);
