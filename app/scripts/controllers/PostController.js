'use strict';

angular.module('me').controller('PostController', ['$md5', 'post', '$post', '$scope', function ($md5, post, $post, $scope) {
  
  post.$promise.then(function (post) {
    $scope.post = post;
    $scope.gravatars = [];
    
    post.comments.forEach(function(comment, index) {
      $md5(comment.email)
        .success(function (hash) {
          $scope.gravatars[index] = 'http://www.gravatar.com/avatar/' + hash + '?s=60&d=404';
        }).error(function () {
          $scope.gravatars[index] = 'media/anonymous.svg';
        });
    });
  });
  
}]);