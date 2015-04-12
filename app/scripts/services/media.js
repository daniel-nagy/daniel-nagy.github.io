'use strict';

angular.module('me').factory('$media', ['$rootScope', function ($rootScope) {
  
  var mediaConstants = {
    'screen-sm': '600px',
    'screen-md': '960px',
    'screen-lg': '1200px'
  };
  
  var mediaQueryConstants = {
    'lt-sm': '(max-width: ' + mediaConstants['screen-sm'] + ')',
    'gt-sm': '(min-width: ' + mediaConstants['screen-sm'] + ')',
    'lt-md': '(max-width: ' + mediaConstants['screen-md'] + ')',
    'gt-md': '(min-width: ' + mediaConstants['screen-md'] + ')',
    'lt-lg': '(max-width: ' + mediaConstants['screen-lg'] + ')',
    'gt-lg': '(min-width: ' + mediaConstants['screen-lg'] + ')'
  };
  
  var queries = {};
  
  // function listener(query) {
  //   $rootScope.$evalAsync(function () {
  //     queries[query.media].matches = query.matches;
  //   });
  // }

  function addQuery(query) {
    var mediaQuery = window.matchMedia(query);
    
    queries[query] = {
      query: mediaQuery,
      matches: mediaQuery.matches
    };
    
    // mediaQuery.addListener(listener);
  }
  
  function $media(query) {
    
    if(mediaQueryConstants.hasOwnProperty(query)) {
      query = mediaQueryConstants[query];
    }
    
    if(!queries.hasOwnProperty(query)) {
      addQuery(query);
    }
    
    return queries[query].query;
  }
  
  // $rootScope.$media = function (query) {
  //   return queries[$media(query).media].matches;
  // }
  
  return $media;
  
}]);