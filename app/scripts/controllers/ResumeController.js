'use strict';

angular.module('me').controller('ResumeController', ['$dialog', '$scope', function ($dialog, $scope) {
  
  $scope.showResume = function () {
    $dialog.show({
      clickOutsideToClose: true,
      templateUrl: 'templates/dialogs/resume-dialog.html'
    });
  };
  
}]);