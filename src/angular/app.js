import mainController from './controllers/es6MainCtrl';

angular.module('linkupApp', [
  'linkupRoutes',
  'authService',
  'userService',
  // 'mainCtrl',
  'userCtrl',
  'dashCtrl',
  'dataService',
  'dashFilters',
  'socialService'
])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    // myProvider.configable = 'this string was set in config'
  })
  .controller('mainController', mainController)
