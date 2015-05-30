'use strict';

angular.module('me').controller('PostController', ['post', '$scope', function (post, $scope) {
  
  post.$promise.then(function (data) {
    $scope.compose = {};
    $scope.post = data;
  });
  
  $scope.postComment = function() {
    
    var comment = {
      author: $scope.compose.author || 'Anonymous',
      body: $scope.compose.body,
      email: $scope.compose.email
    };
    
    $scope.post.comments.push(comment);
    $scope.post.$save(function (data) {
      console.log(data);
    });
  };
  
}]);