'use strict';

angular.module('me').controller('ToolbarCtrl', ['$drawer', '$scope', function ($drawer, $scope) {
  
  var drawer;
  
  $drawer.get('left').then(function(result) {
    drawer = result;
  });
  
  $scope.toggleDrawer = function () {
    drawer.toggle();
  };
  
}]);