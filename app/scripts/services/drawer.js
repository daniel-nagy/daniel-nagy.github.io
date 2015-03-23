'use strict';

angular.module('me').factory('$drawer', function () {
  
  var drawers = {};
  
  return {
    
    toggle: function(id) {
      drawers[id].toggle();
    },
    
    register: function(id, toggle) {
      drawers[id] = {
        'toggle': toggle
      };
    }
  };
});