'use strict';

angular.module('me').controller('LeftDrawerController', ['$location', '$scope', function ($location, $scope) {
  
  $scope.isActive = function(route) {
    return route === $location.url().split('/').slice(-1).pop();
  };
  
}]);