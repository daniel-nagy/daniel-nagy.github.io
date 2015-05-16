'use strict';

angular.module('me').directive('ngView', function () {
  return {
    controller: ['$element', '$scope', '$scroll', function ($element, $scope, $scroll) {
      $scope.$on('$routeChangeStart', function (event, next, current) {
        $scroll.remember(current.$$route.title, $element.parent().prop('scrollTop'));
      });
      $scope.$on('$routeChangeSuccess', function (event, current) {
        $element.ready(function () {
          $element.parent().prop('scrollTop', $scroll.position(current.$$route.title));
        });
      });
    }]
  };
});