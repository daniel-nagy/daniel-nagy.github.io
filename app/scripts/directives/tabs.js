'use strict';

angular.module('me').directive('tabs', function () {
  return {
    link: function (scope, element, attrs) {
      var tabs = element.find('tab');
      var indicator = angular.element('<indicator></indicator>');
      
      element.append(indicator);
      
      angular.forEach(tabs, function(tab, index) {
        tab.tabIndex = index;
      });
      
      if(!attrs.active) {
        attrs.$set('active', 0);
      }
      
      function moveIndicator(index) {
        indicator.css({
          'left': tabs[index].offsetLeft + 'px',
          'width': tabs[index].clientWidth + 'px'
        });
      }
      
      tabs.on('click', function () {
        attrs.$set('active', this.tabIndex);
      });
      
      attrs.$observe('active', moveIndicator);
    }
  };
});
