'use strict';

angular.module('me').controller('ToolbarCtrl', ['$drawer', '$scope', function ($drawer, $scope) {
  
  $scope.toggleDrawer = function (drawer, event) {
    event.stopPropagation();
    $drawer.toggle(drawer);
  };
  
}]);