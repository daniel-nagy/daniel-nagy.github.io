'use strict';

angular.module('me').controller('MusicController', ['$audio', '$http', '$scope', function ($audio, $http, $scope) {
  
  $http.jsonp('https://itunes.apple.com/lookup', {
    cache: true,
    params: {
      'callback': 'JSON_CALLBACK',
      'id': '936832274'
    }
  }).success(function(data) {
    $scope.album = data.results.first();
    $scope.album.artworkUrl600 = $scope.album.artworkUrl60.replace('60x60-50', '600x600');
  });
  
  $scope.tracks = [{
    duration: '2:55',
    file: 'media/Sidekick.m4a',
    number: '02',
    title: 'Sidekick'
  }, {
    duration: '3:39',
    file: 'media/Avalanche.m4a',
    number: '05',
    title: 'Avalanche'
  }, {
    duration: '4:01',
    file: 'media/Portugal.m4a',
    number: '06',
    title: 'Portugal'
  }];
  
  var progress = document.querySelector('progress');
  
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
  
  $audio.on('loadedmetadata', updateMediaPlayer);
  
  $audio.on('timeupdate', function() {
    $scope.$apply(function () {
      progress.value = $scope.currentTime = $audio.currentTime();
    });
  });
  
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