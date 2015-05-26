'use strict';

angular.module('me').factory('$md5', ['$http', function ($http) {
  return function (query) {
    return $http({url: 'http://localhost:3000/hash/' + query});
  };
}]);