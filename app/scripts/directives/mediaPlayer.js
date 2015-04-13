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
    controller: ['$album', '$attrs', '$audio', '$element', '$scope', function ($album, $attrs, $audio, $element, $scope) {
      
      $scope.audio = $audio;
      
      $album($attrs.collectionId).then(function (album) {
        $scope.album = album;
        
        if(!$audio.isSet()) {
          $audio.set($scope.album.currentTrack().title);
        }
        
        $audio.on('timeupdate', function () {
          $scope.$apply();
        });
        
        $audio.on('ended', function () {
          if($scope.album.hasNextTrack()) {
            $scope.$apply(function () {
              $audio.set($scope.album.nextTrack().title);
              $audio.play();
            });
          }
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