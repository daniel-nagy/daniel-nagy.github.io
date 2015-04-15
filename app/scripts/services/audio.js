'use strict';

angular.module('me').factory('$audio', function () {
  
  var audio;
  var base = 'media/Among the Wildest Things/';
  
  return {
    buffered: function () {
      return this.isSet() ? audio.buffered : 0;
    },
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
    on: function (target, callback) {
      if(this.isSet()) {
        audio.addEventListener(target, callback);
      }
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
    repeatEnabled: function () {
      return audio ? audio.hasAttribute('loop') : false;
    },
    repeatOff: function () {
      if(audio) {
        audio.removeAttribute('loop');
      }
    },
    repeatOn: function () {
      if(audio) {
        audio.setAttribute('loop', '');
      }
    },
    set: function (title) {
      if(audio) {
        audio.src = base + title + '.m4a';
        audio.load();
      } else {
        audio = new Audio(base + title + '.m4a');
      }
    },
    setCurrentTime: function (time) {
      if(audio) {
        audio.currentTime = time;
      }
    }
  };
});