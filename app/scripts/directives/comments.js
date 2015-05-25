'use strict';

angular.module('me').directive('comments', function () {
  return {
    controller: ['$scope', function ($scope) {
      $scope.view = 'compose';
      
      $scope.compose = {
        author: '',
        body: '',
        email: ''
      }
      
      $scope.switchView = function (view) {
        $scope.view = view;
      };
    }]
  };
})

.filter('span', ['$filter', function ($filter) {
  var now = new Date();
  
  function timeDifference(a, b) {
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());
    
    return ((utc2 - utc1) / 60000);
  }
  
  return function (input) {
    var minutes = timeDifference(new Date(input), now);
    
    if(minutes < 1) {
      return 'just now';
    } else if(minutes < 60) {
      minutes = Math.floor(minutes);
      return minutes > 1 ? minutes + ' minutes ago' : minutes + ' minute ago';
    } else if(minutes < 1440) {
      var hours = Math.floor(minutes / 60);
      return hours > 1 ? hours + ' hours ago' : hours + ' hour ago';
    } else if(minutes < 43829) {
      var days = Math.floor(minutes / 1440);
      return days > 1 ? days + ' days ago' : days + ' day ago';
    } else {
      return 'commented on ' + $filter('date')(input);
    }
  };
}]);