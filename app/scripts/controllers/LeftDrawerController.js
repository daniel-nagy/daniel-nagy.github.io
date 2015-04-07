'use strict';

angular.module('me').controller('LeftDrawerController', ['$drawer', '$media', '$scope', '$timeout', function ($drawer, $media, $scope, $timeout) {
  
  var drawer;
  var mediaQuery = $media('lt-sm');
  
  $drawer.get('left').then(function (result) {
    drawer = result;
  });
  
  $scope.$on('$routeChangeSuccess', function () {
    if(mediaQuery.matches) {
      $timeout(drawer.close, 150);
    }
  });
  
}]);