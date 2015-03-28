'use strict';

angular.module('me').controller('ToolbarController', ['$drawer', '$scope', '$timeout', function ($drawer, $scope, $timeout) {
  
  var leftDrawer;
  var rightDrawer;
  
  $drawer.get('left').then(function(result) {
    leftDrawer = result;
  });
  
  $drawer.get('right').then(function(result) {
    rightDrawer = result;
  });
  
  $scope.toggleLeftDrawer = function () {
    $timeout(leftDrawer.toggle, 300);
  };
  
  $scope.toggleRightDrawer = function () {
    $timeout(rightDrawer.toggle, 300);
  };
  
}]);