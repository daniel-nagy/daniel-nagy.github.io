'use strict';

angular.module('me').directive('mediaPlayer', ['$album', '$audio', function ($album, $audio) {
  return {
    templateUrl: 'templates/components/media-player.html',
    link: function (scope, element, attrs) {
      var progress = element.find('progress-linear');
      var scroll = element.find('scroll');
      var toolbar = scroll.previous();
      
      scope.audio = $audio;
      
      function oncanplaythrough() {
        progress.one('animationiteration webkitAnimationIteration', function () {
          scope.loading = undefined;
          scope.$apply();
        });
      }
      
      function ondurationchange() {
        scope.duration = $audio.duration();
        scope.$apply();
      }
      
      function onloadstart() {
        scope.currentTime = 0;
        scope.duration = 0;
        scope.loading = true;
        scope.$apply();
      }
      
      function onprogress() {
        scope.$apply();
      }
      
      function onsuspend() {
        progress.one('animationiteration webkitAnimationIteration', function () {
          scope.loading = undefined;
          scope.$apply();
        });
      }
      
      function ontimeupdate() {
        scope.currentTime = $audio.currentTime();
        scope.$apply();
      }
      
      function cleanUp() {
        $audio.off('canplaythrough', oncanplaythrough);
        $audio.off('durationchange', ondurationchange);
        $audio.off('loadstart', onloadstart);
        $audio.off('progress', onprogress);
        $audio.off('suspend', onsuspend);
        $audio.off('timeupdate', ontimeupdate);
      }
      
      scroll.on('scroll', function () {
        if(scroll.prop('scrollTop') <= 0) {
          toolbar.removeClass('elevated');
        } else {
          toolbar.addClass('elevated');
        }
      });
      
      $album(attrs.collectionId).then(function (album) {
        scope.album = album;
        
        if($audio.isSet()) {
          scope.duration = $audio.duration();
          scope.currentTime = $audio.currentTime();
        } else {
          $audio.set(scope.album.currentTrack().title);
          $audio.on('ended', function () {
            if(album.hasNextTrack()) {
              $audio.set(album.nextTrack().title);
              $audio.play();
            }
          });
        }
        
        $audio.on('canplaythrough', oncanplaythrough);
        $audio.on('durationchange', ondurationchange);
        $audio.on('loadstart', onloadstart);
        $audio.on('progress', onprogress);
        $audio.on('suspend', onsuspend);
        $audio.on('timeupdate', ontimeupdate);
        
        var pointerstart = progress.hasOwnProperty('ontouchstart') ? 'touchstart' : 'mousedown';
        
        progress.on(pointerstart, function (event) {
          $audio.setCurrentTime(event.offsetX * (progress.attr('max') / progress.prop('clientWidth')));
        });
      });
      
      scope.$on('$destroy', cleanUp);
      
    },
    controller: ['$scope', function ($scope) {
      
      $scope.selectTrack = function (track, index) {
        $scope.album.selectTrack(index);
        $audio.set(track.title);
        $audio.play();
      };
      
      $scope.selectNext = function () {
        var playing = $audio.isPlaying();
        
        $audio.set($scope.album.nextTrack().title);
        
        if(playing) {
          $audio.play();
        }
      };
      
      $scope.selectPrevious = function () {
        var playing = $audio.isPlaying();
        
        $audio.set($scope.album.previousTrack().title);
        
        if(playing) {
          $audio.play();
        }
      };
      
      $scope.toggleRepeat = function () {
        if($audio.repeatEnabled()) {
          $audio.repeatOff();
        } else {
          $audio.repeatOn();
        }
      };
      
      $scope.toggleShuffle = function () {
        if($scope.album.isShuffled()) {
          $scope.album.unShuffle();
        } else {
          $scope.album.shuffle();
        }
      };
    }]
  };
}])

.filter('zeroPad', function () {
  return function (input) {
    return input < 10 ? '0' + input : input;
  };
})

.filter('playBack', ['$filter', function ($filter) {
  return function (input) {
    var minutes = Math.floor(input / 60);
    var seconds = $filter('zeroPad')(Math.floor(input % 60));
    
    return minutes + ':' + seconds;
  };
}]);