'use strict';

angular.module('me').directive('mediaPlayer', function () {
  return {
    templateUrl: 'templates/media-player.html',
    link: function (scope, element) {
      var scroll = element.find('scroll');
      var toolbar = scroll.previous();
      
      scroll.on('scroll', function () {
        if(scroll.prop('scrollTop') <= 0) {
          toolbar.removeClass('elevated');
        } else {
          toolbar.addClass('elevated');
        }
      });
    },
    controller: ['$album', '$audio', '$attrs', '$element', '$scope', function ($album, $audio, $attrs, $element, $scope) {
      $scope.audio = $audio;
      
      $album($attrs.collectionId).then(function (album) {
        $scope.album = album;
        
        if(!$audio.isSet()) {
          $audio.set($scope.album.currentTrack().title);
        }
        
        var progress = $element.find('progress-linear');
        
        $audio.on('loadstart', function () {
          $scope.$apply(function () {
            $scope.currentTime = 0;
            $scope.duration = 0;
            $scope.buffered = 0;
            $scope.loading = true;
          });
        });
        
        $audio.on('progress', function () {
          $scope.$apply($scope.buffered = $audio.buffered());
        });
        
        $audio.on('canplaythrough', function () {
          progress.one('animationiteration webkitAnimationIteration', function () {
            $scope.$apply($scope.loading = undefined);
          });
        });
        
        $audio.on('suspend', function () {
          progress.one('animationiteration webkitAnimationIteration', function () {
            $scope.$apply($scope.loading = undefined);
          });
        });
        
        $audio.on('durationchange', function () {
          $scope.$apply($scope.duration = $audio.duration());
        });
        
        $audio.on('timeupdate', function () {
          $scope.$apply($scope.currentTime = $audio.currentTime());
        });
        
        $audio.on('ended', function () {
          if($scope.album.hasNextTrack()) {
            $scope.$apply(function () {
              $audio.set($scope.album.nextTrack().title);
              $audio.play();
            });
          }
        });
        
        var pointerstart = progress.hasOwnProperty('ontouchstart') ? 'touchstart' : 'mousedown';
        
        progress.on(pointerstart, function (event) {
          $audio.setCurrentTime(event.offsetX * (progress.attr('max') / progress.prop('clientWidth')));
        });
      });
      
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
})

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