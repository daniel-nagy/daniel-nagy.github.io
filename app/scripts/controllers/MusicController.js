'use strict';

angular.module('me').controller('MusicController', ['$http', '$scope', function ($http, $scope) {
  
  $scope.tracks = [{
    duration: '2:55',
    number: '02',
    title: 'Sidekick'
  }, {
    duration: '3:39',
    number: '05',
    title: 'Avalanche'
  }, {
    duration: '4:01',
    number: '06',
    title: 'Portugal'
  }];
  
  $scope.activeTrack = $scope.tracks.first();
  $scope.currentTime = 0;
  
  var audio = new Audio('media/Sidekick.m4a');
  
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
  
  $scope.play = function () {
    audio.play();
    $scope.playing = true;
  };
  
  $scope.pause = function () {
    audio.pause();
    $scope.playing = false;
  };
  
  $scope.selectTrack = function (track) {
    audio.setAttribute('src', 'media/' + track.title + '.m4a');
    
    $scope.activeTrack = track;
    $scope.currentTime = 0;
    $scope.play();
  };
  
  audio.addEventListener("loadedmetadata", function() {
    $scope.$apply($scope.duration = Math.floor(audio.duration));
  });
  
  audio.addEventListener('timeupdate', function() {
    $scope.$apply($scope.currentTime = Math.floor(audio.currentTime));
  });
  
}])

.filter('playBack', function () {
  return function (input) {
    
    var minutes = Math.floor(input / 60);
    var seconds = input % 60;
    
    var time = minutes + ':';
    time += seconds < 10 ? '0' + seconds : seconds;
    
    return time;
  };
});