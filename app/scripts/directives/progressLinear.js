'use strict';

angular.module('me').directive('progressLinear', function () {
  return {
    template: '<bar></bar><bar></bar>',
    link: function (scope, element, attrs) {
      var bar = element.find('bar').eq(0);
      
      attrs.$observe('buffered', function () {
        if(!attrs.indeterminate) {
          var height = element.prop('clientHeight');
          var width = element.prop('clientWidth') * (attrs.buffered / attrs.max);
          element.css('clip', 'rect(0, ' + width + 'px, ' + height + 'px, 0)');
        }
      });
      
      attrs.$observe('value', function () {
        bar.css('width', ((attrs.value / attrs.max) * 100) + '%');
      });
      
      
      attrs.$observe('indeterminate', function () {
        var height = element.prop('clientHeight');
        var width = element.prop('clientWidth');
        
        if(attrs.indeterminate) {
          element.css('clip', 'rect(0, ' + width + 'px, ' + height + 'px, 0)');
        } else if(attrs.buffered) {
          element.css('clip', 'rect(0, ' + (width * (attrs.buffered / attrs.max)) + 'px, ' + height + 'px, 0)');
        }
      });
      
    }
  };
});