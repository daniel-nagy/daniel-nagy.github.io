'use strict';

angular.module('me').controller('RightDrawerController', ['$drawer', '$scope', '$timeout', function ($drawer, $scope, $timeout) {

  var drawer;
  
  $drawer.get('right').then(function (result) {
    drawer = result;
  });
  
  $scope.closeDrawer = function () {
    $timeout(drawer.close, 300);
  };

}]);