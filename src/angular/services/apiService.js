angular.module('linkupApp')
  .provider('myProvider', function () {
    this.$get = angular.noop;
  })

// angular.module('linkupApp')
//   .provider('myProvider', function(){
//     var baseUrl = 'https://itunes.apple.com/search?term=';
//     var _artist = '';
//     var _finalUrl = '';
//
//     //Going to set this property on the config function below
//     this.thingFromConfig = '';
//
//     var makeUrl = function(){
//       _artist = _artist.split(' ').join('+');
//       _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK'
//       return _finalUrl;
//     }
//
//     this.$get = function($http, $q){
//       return {
//         callItunes: function(){
//           makeUrl();
//           var deferred = $q.defer();
//           $http({
//             method: 'JSONP',
//             url: _finalUrl
//           }).success(function(data){
//             deferred.resolve(data);
//           }).error(function(){
//             deferred.reject('There was an error')
//           })
//           return deferred.promise;
//         },
//         setArtist: function(artist){
//           _artist = artist;
//         },
//         getArtist: function(){
//           return _artist;
//         },
//         thingOnConfig: this.thingFromConfig
//       }
//     }
//   });
