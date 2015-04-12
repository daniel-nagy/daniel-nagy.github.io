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
    duration: '3:18',
    file: 'media/Sidekick.m4a',
    number: '03',
    title: 'Shut Up and Dance'
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
  }, {
    duration: '2:55',
    file: 'media/Sidekick.m4a',
    number: '02',
    title: 'Sidekick'
  }, {
    duration: '3:18',
    file: 'media/Sidekick.m4a',
    number: '03',
    title: 'Shut Up and Dance'
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
  
}]);