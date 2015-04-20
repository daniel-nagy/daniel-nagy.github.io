'use strict';

angular.module('me').directive('progressLinear', function () {
  return {
    template: '<bar></bar><bar></bar>',
    link: function (scope, element, attrs) {
      var bar = element.find('bar').eq(0);
      
      function clipProgress(height, width) {
        if(attrs.max > 0) {
          element.css('clip', 'rect(0, ' + (width * (attrs.buffered / attrs.max)) + 'px, ' + height + 'px, 0)');
        } else {
          element.css('clip', 'rect(0, ' + '0, ' + height + 'px, 0)');
        }
      }
      
      attrs.$observe('buffered', function () {
        if(!attrs.indeterminate) {
          clipProgress(element.prop('clientHeight'), element.prop('clientWidth'));
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
          clipProgress(height, width);
        }
      });
      
    }
  };
});