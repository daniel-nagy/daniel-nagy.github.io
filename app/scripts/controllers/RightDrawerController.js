'use strict';

angular.module('me').controller('RightDrawerController', ['$drawer', '$media', '$scope', '$timeout', function ($drawer, $media, $scope, $timeout) {

  var drawer;
  var mediaQuery = $media('lt-sm');
  
  $scope.showToolbar = mediaQuery.matches;
  
  mediaQuery.addListener(function(query) {
    $timeout(function () {
      $scope.showToolbar = query.matches;
    }, 350);
  });
  
  $drawer.get('right').then(function (result) {
    drawer = result;
  });
  
  $scope.closeDrawer = function () {
    $timeout(drawer.close, 300);
  };

}]);