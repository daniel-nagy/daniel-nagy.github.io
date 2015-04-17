'use strict';

angular.module('me').directive('progressLinear', function () {
  return {
    template: '<bar></bar>',
    link: function (scope, element, attrs) {
      var bar = element.find('bar');
      
      if(attrs.buffered) {
        var height = element.prop('clientHeight');
        element.css('clip', 'rect(0, ' + '0px, ' + height + 'px, 0)');
        
        attrs.$observe('buffered', function () {
          var width = element.prop('clientWidth') * (attrs.buffered / attrs.max);
          element.css('clip', 'rect(0, ' + width + 'px, ' + height + 'px, 0)');
        });
      }
      
      attrs.$observe('value', function () {
        bar.css('width', ((attrs.value / attrs.max) * 100) + '%');
      });
    }
  };
});