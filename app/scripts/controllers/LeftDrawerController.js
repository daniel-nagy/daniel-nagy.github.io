'use strict';

angular.module('me').controller('LeftDrawerController', ['$drawer', '$scope', '$timeout', function ($drawer, $scope, $timeout) {
  
  var drawer;
  
  $drawer.get('left').then(function (result) {
    drawer = result;
    
    $scope.$on('$routeChangeSuccess', function () {
      $timeout(drawer.close, 150);
    });
  });
  
}]);