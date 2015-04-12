'use strict';

angular.module('me').directive('mediaPlayer', ['$audio', '$media', function ($audio, $media) {
  return {
    templateUrl: 'templates/media-player.html',
    link: function (scope, element, attrs) {
      
      var toolbar = element.find('media-toolbar').eq(1);
      var scroll = element.find('scroll');
      
      scope.media = $media('(max-width: 700px)');
      scope.showTracks = !scope.media.matches;
      
      scope.toggle = {
        tracks: function () {
          scope.showTracks = !scope.showTracks;
        }
      };
      
      function toggleClasses() {
        if(scope.media.matches) {
          toolbar.addClass('primary');
          scroll.addClass('animate');
        } else {
          toolbar.removeClass('primary');
          scroll.removeClass('animate');
        }
      }
      
      toggleClasses();
      scope.media.addListener(function () {
        scope.$apply(toggleClasses);
      });
      
      scroll.on('scroll', function () {
        if(scroll.prop('scrollTop') === 0) {
          toolbar.removeClass('elevated');
        } else {
          toolbar.addClass('elevated');
        }
      });
    },
    controller: audioController
  };
  
  function audioController($scope, $element) {
    $scope.currentTime = 0;
    
    var progress = $element.find('progress').first();
    
    function updateMediaPlayer() {
      $scope.playing = $audio.isPlaying();
      $scope.currentTime = $audio.currentTime();
      progress.value = $audio.currentTime();
      progress.max = $audio.duration();
    }
    
    if($audio.isSet()) {
      updateMediaPlayer();
      
      $scope.tracks.some(function (track) {
        if(track.title === $audio.name) {
          $scope.activeTrack = track;
          return true;
        }
      });
    }
    
    else {
      $scope.activeTrack = $scope.tracks.first();
      $audio.set($scope.activeTrack.title, $scope.activeTrack.file);
    }
    
    $scope.play = function () {
      $audio.play();
      $scope.playing = true;
    };
    
    $scope.pause = function () {
      $audio.pause();
      $scope.playing = false;
    };
    
    $scope.selectTrack = function (track) {
      $audio.set(track.title, track.file);
      $scope.activeTrack = track;
      $scope.play();
    };
    
    $scope.toggleRepeat = function () {
      
      if($scope.repeat) {
        $scope.repeat = false;
      }
      
      else {
        $scope.repeat = true;
      }
    }
    
    $scope.toggleShuffle = function () {
      
      if($scope.shuffle) {
        $scope.shuffle = false;
      }
      
      else {
        $scope.shuffle = true;
      }
    }
    
    $audio.on('loadedmetadata', updateMediaPlayer);
    
    $audio.on('timeupdate', function() {
      $scope.$apply(function () {
        progress.value = $scope.currentTime = $audio.currentTime();
      });
    });
  }
}])

.filter('playBack', function () {
  return function (input) {

    var minutes = Math.floor(input / 60);
    var seconds = input % 60;

    if(seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  };
});