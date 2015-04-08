'use strict';

angular.module('me').controller('LeftDrawerController', ['$drawer', '$media', '$scope', '$timeout', function ($drawer, $media, $scope, $timeout) {
  
  var drawer;
  
  $drawer.get('left').then(function (result) {
    drawer = result;
    
    var mediaQuery = $media('lt-sm');
    
    $scope.$on('$routeChangeSuccess', function () {
      if(mediaQuery.matches) {
        $timeout(drawer.close, 150);
      }
    });
  });
  
}]);