'use strict';

angular.module('me').controller('LeftDrawerController', ['$scope', function ($scope) {
  
  $scope.menu = [{
    active: true,
    href: '#me',
    icon: 'person',
    text: 'About Me',
  }];
  
}]);