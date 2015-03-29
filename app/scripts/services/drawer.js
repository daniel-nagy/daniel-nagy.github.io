'use strict';

angular.module('me').factory('$drawer', ['$q', function ($q) {
  
  var drawers = {};
  var promises = {};
  
  return {
    
    get: function (id) {
      
      if(promises.hasOwnProperty(id)) {
        return promises[id].promise;
      }
      
      promises[id] = $q.defer();
      
      if(drawers.hasOwnProperty(id)) {
        promises[id].resolve(drawers[id]);
      }
      
      return promises[id].promise;
    },
    
    register: function (id, instance) {
      drawers[id] = instance;
      
      if(promises.hasOwnProperty(id)) {
        promises[id].resolve(drawers[id]);
      }
    }
  };
}]);