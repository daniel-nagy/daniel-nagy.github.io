'use strict';

/*
 * This directive allows managing flex children using
 * attributes and is compliant with the previous two
 * versions of all major browsers.
 */

angular.module('me').directive('flex', function () {
  return {
    link: function(scope, element, attrs) {
      
      var grow   = attrs.grow   ? attrs.grow   : 0;
      var shrink = attrs.shrink ? attrs.shrink : 0;
      var basis  = attrs.basis  ? attrs.basis  : 'auto';
      
      element.css({
        '-webkit-flex': grow + ' ' + shrink + ' ' + basis,
            '-ms-flex': grow + ' ' + shrink + ' ' + basis,
                'flex': grow + ' ' + shrink + ' ' + basis,
      });
      
      if(attrs.align) {
        element.css({
          '-ms-flex-item-align': attrs.align,
           '-webkit-align-self': attrs.align,
                   'align-self': attrs.align
        });
      }
      
      if(attrs.order) {
        element.css({
          '-ms-flex-order': attrs.order,
           '-webkit-order': attrs.order,
                   'order': attrs.order,
        });
      }
    }
  };
});