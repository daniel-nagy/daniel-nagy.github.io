'use strict';

angular.module('me').factory('$audio', function () {
  
  var audio;
  var name;
  
  return {
    currentTime: function () {
      return Math.floor(audio.currentTime) || 0;
    },
    duration: function () {
      return Math.floor(audio.duration) || 0;
    },
    isPlaying: function () {
      return !audio.paused;
    },
    isSet: function () {
      return audio ? true : false;
    },
    on: function (event, callback) {
      audio.addEventListener(event, callback);
    },
    name: function () {
      return name;
    },
    play: function () {
      audio.play();
    },
    pause: function () {
      audio.pause();
    },
    set: function (name, url) {
      
      this.name = name;
      
      if(audio) {
        audio.setAttribute('src', url);
      } else {
        audio = new Audio(url);
      }
    }
  };
});