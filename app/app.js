'use strict';

angular.module('me', ['ngAnimate', 'ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  
  $routeProvider.when('/about', {
    templateUrl: 'templates/about.html',
    title: 'About Me'
  }).when('/projects', {
    templateUrl: 'templates/projects.html',
    title: 'Projects'
  }).when('/professional', {
    templateUrl: 'templates/professional.html',
    title: 'Professional'
  }).otherwise({
    redirectTo  : '/about'
  });
  
}])

.run(['$rootScope', function ($rootScope) {
  
  $rootScope.title = 'Me';
  
  $rootScope.$on('$routeChangeSuccess', function (event, current) {
    $rootScope.title = current.title ? current.title : undefined;
  });
  
  angular.element.prototype.first = function () {
    return this[0];
  };
  
  angular.element.prototype.previous = function () {
    return angular.element(this.prop('previousSibling'));
  };
  
  Array.prototype.first = function () {
    return this[0];
  };
  
}]);