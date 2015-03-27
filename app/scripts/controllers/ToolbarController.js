'use strict';

angular.module('me').controller('ToolbarController', ['$drawer', '$scope', function ($drawer, $scope) {
  
  var leftDrawer;
  var rightDrawer;
  
  $drawer.get('left').then(function(result) {
    leftDrawer = result;
  });
  
  $drawer.get('right').then(function(result) {
    rightDrawer = result;
  });
  
  $scope.toggleLeftDrawer = function () {
    leftDrawer.toggle();
  };
  
  $scope.toggleRightDrawer = function () {
    rightDrawer.toggle();
  };
  
}]);