'use strict';

angular.module('me', ['ngAnimate', 'ngRoute'])

.value("$media", {
  'screen-sm': '600px',
  'screen-md': '960px',
  'screen-lg': '1200px'
})

.run(function () {
  angular.element.prototype.previous = function () {
    return angular.element(this.prop('previousSibling'));
  }
});