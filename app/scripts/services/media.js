'use strict';

angular.module('me').factory('$media', function () {
  
  var width = {
    'screen-sm': '600px',
    'screen-md': '960px',
    'screen-lg': '1200px'
  };
  
  return {
    query: function (query, size) {
      size = width.hasOwnProperty(size) ? width[size] : size
      return window.matchMedia('(' + query + ': ' + size + ')');
    }
  };
  
});