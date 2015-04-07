'use strict';

angular.module('me', ['ngAnimate', 'ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  
  var view = document.querySelector('scroll.view');
  
  function scrollTop($scroll) {
    return $scroll(view, view.scrollTop, 0);
  }
  
  $routeProvider.when('/about', {
    templateUrl: 'templates/about.html',
    title: 'About Me',
    resolve: {
      scroll: scrollTop
    }
  }).when('/projects', {
    templateUrl: 'templates/projects.html',
    title: 'Projects',
    resolve: {
      scroll: scrollTop
    }
  }).when('/professional', {
    templateUrl: 'templates/professional.html',
    title: 'Professional',
    resolve: {
      scroll: scrollTop
    }
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