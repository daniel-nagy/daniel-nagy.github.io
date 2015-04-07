'use strict';

angular.module('me').factory('$audio', function () {
  
  var audio;
  var name;
  
  return {
    currentTime: function () {
      return this.isSet() ? Math.floor(audio.currentTime) : 0;
    },
    duration: function () {
      if(this.isSet() && !isNaN(audio.duration)) {
        return Math.floor(audio.duration);
      } else {
        return 0;
      }
    },
    isPlaying: function () {
      return this.isSet() ? !audio.paused : false;
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
      if(this.isSet()) {
        audio.play();
      }
    },
    pause: function () {
      if(this.isSet()) {
        audio.pause();
      }
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