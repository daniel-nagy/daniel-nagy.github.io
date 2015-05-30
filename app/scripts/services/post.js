'use strict';

angular.module('me').factory('$post', ['$resource', function ($resource) {
  return $resource('http://localhost:3000/post/:id:title', {id: '@_id', title: null});
}]);