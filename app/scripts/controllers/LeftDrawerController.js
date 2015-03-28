'use strict';

angular.module('me').controller('LeftDrawerController', ['$scope', function ($scope) {
  
  $scope.menu = [{
    active: true,
    href: '#me',
    icon: 'icons/person.svg',
    text: 'About Me',
  }];
  
}]);