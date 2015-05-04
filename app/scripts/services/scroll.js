'use strict';

angular.module('me').factory('$scroll', ['$q', function ($q) {
  
  var cache = {};
  
  function scroll(element, from, to, duration) {
    
    duration = duration || 500; // miliseconds (0.5 seconds)
    
    var defer = $q.defer();
    
    var distance = to - from;
    
    if(distance === 0) {
      return defer.resolve('scroll complete');
    }
    
    var timeLapsed = 0;
    var percentage, position;
    
    function easeInOutCubic(time) {
      
      /*
       * if the lapsed time is less than half of the
       * duration accelerate the animation, otherwise
       * decelerate the animation
       */
      
      return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
    }
    
    function animateScroll() {
      timeLapsed += 16; // 16 millisecond have passed
      percentage  = (timeLapsed / duration); // percent of animation completed
      percentage  = (percentage > 1) ? 1 : percentage;
      position    = from + (distance * easeInOutCubic(percentage));
      
      element.scrollTop = Math.floor(position);
      
      if(position === to) {
        clearInterval(animationInterval);
        defer.resolve('scroll complete');
      }
    }
    
    var animationInterval = setInterval(animateScroll, 16);
    
    return defer.promise;
  }
  
  return {
    remember: function (page, position) {
      cache[page] = position;
    },
    position: function (page) {
      return cache.hasOwnProperty(page) ? cache[page] : 0;
    },
    scroll: scroll
  };
  
}]);