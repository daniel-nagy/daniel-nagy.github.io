'use strict';

angular.module('me').factory('$album', ['$http', '$q', function ($http, $q) {
  
  var albums = [];
  
  function Album(collection, tracks) {
    this.artist = collection.artistName;
    this.artworkUrl = collection.artworkUrl60.replace('60x60-50', '600x600');
    this.release = collection.releaseDate.split('-').first();
    this.title = collection.collectionName;
    this.trackCount = tracks.length;
    
    this.tracks = [];
    this._current = 0;
    
    tracks.forEach(function(track) {
      this.tracks.push({
        duration: track.trackTimeMillis / 1000,
        number: track.trackNumber,
        title: track.trackName,
      });
    }, this);
  }
  
  Album.prototype.currentTrack = function () {
    return this.tracks[this._current];
  };
  
  Album.prototype.hasNextTrack = function () {
    return this._current < this.trackCount - 1;
  };
  
  Album.prototype.hasPreviousTrack = function () {
    return this._current > 0;
  };
  
  Album.prototype.isShuffled = function () {
    var number = 0;
    
    return this.tracks.some(function (track) {
      return track.number !== ++number;
    });
  };
  
  Album.prototype.nextTrack = function () {
    return this._current < this.trackCount - 1 ? this.tracks[++this._current] : null;
  };
  
  Album.prototype.previousTrack = function () {
    return this._current > 0 ? this.tracks[--this._current] : null;
  };
  
  Album.prototype.selectTrack = function (index) {
    this._current = index;
  };
  
  // Fisher–Yates shuffle
  Album.prototype.shuffle = function () {
    for(var i = this.tracks.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.tracks[i];
      
      this.tracks[i] = this.tracks[j];
      this.tracks[j] = temp;
      
      if(this._current === j) {
        this._current = i;
      }
    }
  };
  
  Album.prototype.unShuffle = function () {
    this._current = this.tracks[this._current].number - 1;
    this.tracks.sort(function (a, b) {
      return a.number - b.number;
    });
  };
  
  return function (collectionId) {
    var defer = $q.defer();
    
    if(albums.hasOwnProperty(collectionId)) {
      defer.resolve(albums[collectionId]);
    }
    
    else {
      var itunesLookup = JSON.parse(localStorage.getItem(collectionId));
      
      if(itunesLookup) {
        albums[collectionId] = new Album(itunesLookup.results.shift(), itunesLookup.results);
        defer.resolve(albums[collectionId]);
      } else {
        $http.jsonp('https://itunes.apple.com/lookup', {
          params: {
            'callback': 'JSON_CALLBACK',
            'id': collectionId,
            'country': 'us',
            'entity': 'song'
          }
        }).success(function (data) {
          localStorage.setItem(collectionId, JSON.stringify(data));
          albums[collectionId] = new Album(data.results.shift(), data.results);
          defer.resolve(albums[collectionId]);
        });
      }
    }
    
    return defer.promise;
  };
  
}]);