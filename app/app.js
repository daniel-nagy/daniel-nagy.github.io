'use strict';

angular.module('me', ['ngAnimate', 'ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  
  $routeProvider.when('/me', {
    templateUrl: 'templates/me.html'
  }).otherwise({
    redirectTo  : '/me'
  });
  
}])

.run(function () {
  
  angular.element.prototype.first = function () {
    return this[0];
  };
  
  angular.element.prototype.previous = function () {
    return angular.element(this.prop('previousSibling'));
  };
  
  Array.prototype.first = function () {
    return this[0];
  };
  
});