'use strict';

angular.module('me').controller('PostController', ['post', '$post', '$scope', function (post, $post, $scope) {
  
  post.$promise.then(function (post) {
    $scope.post = post;
  });
  
}]);