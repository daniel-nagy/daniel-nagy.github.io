'use strict';

angular.module('me').controller('LeftDrawerController', ['$scope', function ($scope) {
  
  $scope.menu = [{
    text: 'About Me'
  }, {
    text: 'Projects'
  }, {
    text: 'Professional'
  }];
  
}]);