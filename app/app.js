'use strict';

angular.module('me', ['ngAnimate', 'ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  
  $routeProvider.when('/me', {
    templateUrl: 'templates/me.html'
  }).otherwise({
    redirectTo  : '/me'
  });
  
}])

.value("$media", {
  'screen-sm': '600px',
  'screen-md': '960px',
  'screen-lg': '1200px'
})

.run(function () {
  
  angular.element.prototype.first = function () {
    return this[0];
  }
  
  angular.element.prototype.previous = function () {
    return angular.element(this.prop('previousSibling'));
  }
  
  Array.prototype.first = function () {
    return this[0];
  };
  
});