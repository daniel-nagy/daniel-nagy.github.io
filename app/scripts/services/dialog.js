'use strict';

angular.module('me').factory('$dialog', ['$animate', '$backdrop', '$compile', '$controller', '$http', '$q', '$rootScope', '$templateCache',
function ($animate, $backdrop, $compile, $controller, $http, $q, $rootScope, $templateCache) {
  
  var $dialog = {};
  
  var dialog;
  var scope;
  
  function getTemplate(options) {
    if(typeof options === 'object' && options.template) {
      return $q.when(options.template);
    }
    
    else if(typeof options === 'object' && options.templateUrl) {
      return $http.get(options.templateUrl, { cache: $templateCache }).then(function (result) {
        return result.data;
      });
    }
    
    return $q.when();
  }
  
  $dialog.hide = function () {
    $backdrop.leave();
    $animate.leave(dialog).then(function () {
      if(scope) {
        scope.$destroy();
      }
    });
  };
  
  $dialog.show = function (options) {
    var defer = $q.defer();
    
    var instance = {
      promise: defer.promise
    };
    
    getTemplate(options).then(function (template) {
      instance.reject = function (reason) {
        defer.reject(reason);
        $dialog.hide();
      };
      
      instance.resolve = function (result) {
        defer.resolve(result);
        $dialog.hide();
      };
      
      scope = $rootScope.$new();
      scope.hide = $dialog.hide;
      
      if(typeof options === 'object' && options.controller) {
        $controller(options.controller, {$scope: scope, $dialog: instance});
      }
      
      dialog = $compile(angular.element('<dialog-container></dialog-container>').html(template))(scope);
      
      $backdrop.enter();
      
      $animate.enter(dialog, document.body).then(function () {
        if(typeof options === 'object' && options.clickOutsideToClose) {
          
          dialog.children().first().addEventListener('click', function (event) {
            event.stopImmediatePropagation();
          });
          
          dialog.on('click', function () {
            $rootScope.$apply(function (){
              instance.resolve('User clicked outside to close');
            });
          });
        }
      });
      
    }).catch(function (reason) {
      defer.reject(reason);
      throw new Error('Your dialog template appears to be missing.');
    });
    
    return instance;
  };
  
  return $dialog;
}]);