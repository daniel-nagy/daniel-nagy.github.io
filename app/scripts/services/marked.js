'use strict';

angular.module('me').provider('$marked', function () {

  this.config = function (options) {
    this.options = options;
  };
  
  this.$get = ['$window', function ($window) {
    var marked = $window.marked;
    
    if(!marked) {
      throw new Error('Please include marked.js in your index.html.');
    }
    
    marked.setOptions(this.options);
    
    return marked;
  }];

});