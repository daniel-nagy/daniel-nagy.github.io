'use strict';

angular.module('me', [
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'ngSanitize'
])

.config(['$routeProvider', function ($routeProvider) {
  
  $routeProvider.when('/about', {
    templateUrl: 'templates/about.html',
    title: 'About Me',
  }).when('/unprofessional', {
    templateUrl: 'templates/unprofessional.html',
    title: 'Unprofessional',
  }).when('/blog-posts', {
    templateUrl: 'templates/blog-posts.html',
    title: 'Blog Posts',
  }).when('/blog-posts/user-experience', {
    templateUrl: 'templates/posts/user-experience.html',
    controller: 'PostController',
    resolve: {
      post: ['$post', function ($post) {
        return $post.get({title: 'User Experience'});
      }]
    },
    title: 'Blog Posts',
  }).when('/projects', {
    templateUrl: 'templates/projects.html',
    title: 'Projects',
  }).when('/professional', {
    templateUrl: 'templates/professional.html',
    title: 'Professional',
  }).otherwise({
    redirectTo  : '/about'
  });
}])

.run(['$rootScope', function ($rootScope) {
  
  $rootScope.$on('$routeChangeSuccess', function (event, current) {
    $rootScope.title = current.title ? current.title : undefined;
  });
  
  angular.element.prototype.getDomElement = function () {
    return this[0];
  };
  
  angular.element.prototype.isEmpty = function () {
    for(var prop in this) {
      if(this.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  };
  
  angular.element.prototype.previous = function () {
    return angular.element(this.prop('previousElementSibling'));
  };
  
  Array.prototype.first = function () {
    return this[0];
  };
  
}]);