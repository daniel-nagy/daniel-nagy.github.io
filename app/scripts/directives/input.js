'use strict';

angular.module('me').directive('inputContainer', ['$window', function ($window) {
  return {
    scope: true,
    link: function (scope, element) {
      var label = element.find('label').addClass('disable');
      var input = element.find('input');
      var style;
      
      function setTextAreaHeight() {
        var textarea = input.getDomElement();
        var paddingTop = style.paddingTop.slice(0, -2);
        var paddingBottom = style.paddingBottom.slice(0, -2);
        
        textarea.style.height = '20px';
        
        var height = textarea.scrollHeight - paddingTop - paddingBottom;
        
        textarea.style.height = height + 'px';
      }
      
      function watchInput() {
        input.on('input', setTextAreaHeight);
        $window.addEventListener('resize', setTextAreaHeight);
      }
      
      if(input.isEmpty()) {
        input = element.find('textarea');
        
        if(input.isEmpty()) {
          return;
        }
        
        style = $window.getComputedStyle(input[0]);
        watchInput();
      }
      
      input.ready(function () {
        if(input.prop('value')) {
          element.addClass('has-value');
          label.one('transitionend', function () {
            label.removeClass('disable');
          });
        } else {
          label.removeClass('disable');
        }
        
        if(input.prop('nodeName') === 'TEXTAREA') {
          setTextAreaHeight();
        }
      });
      
      element.on('click', function (event) {
        event.stopPropagation();
      });
      
      label.on('click', function (event) {
        event.stopImmediatePropagation();
        input[0].focus();
      });
      
      input.on('focus', function () {
        element.addClass('active');
      });
      
      input.on('blur', function () {
        
        if(this.value) {
          element.addClass('has-value');
        } else {
          element.removeClass('has-value');
        }
        
        element.removeClass('active');
      });
    }
  };
}]);