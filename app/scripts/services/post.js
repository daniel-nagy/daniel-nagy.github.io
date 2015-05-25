'use strict';

angular.module('me').factory('$post', ['$resource', function ($resource) {
  return $resource('http://localhost:3000/posts/:id:title', {id: '@_id', title: null}, {
    update: {method: 'PUT'}
  });
}]);