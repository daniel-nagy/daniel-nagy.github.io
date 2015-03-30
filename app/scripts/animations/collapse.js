'use strict';

angular.module('me').animation('.collapse', ['$animate', function ($animate) {
  return {
    beforeEnter: function (element, done) {
      element.css('margin-top', '-' + element.prop('clientHeight') + 'px');
      done();
    },
    enter: function (element, done) {
      $animate.animate(element, {'margin-top': '-' + element.prop('clientHeight') + 'px'}, {'margin-top': '0'}).then(done);
    },
    leave: function (element, done) {
      $animate.animate(element, {'margin-top': '0'}, {'margin-top': '-' + element.prop('clientHeight') + 'px'}).then(done);
    }
  };
}]);