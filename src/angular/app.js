import mainController from './controllers/es6MainCtrl';
import appRoutes     from './app.route.js';
import './services/authService';
import './services/userService';
import './controllers/dashCtrl';
import './controllers/userCtrl';
import './services/dataService';
import './services/dashFilters';
import './services/socialService';

angular.module('linkupApp', [
  'ngRoute',
  // appRoutes',
  'authService',
  'userService',
  // 'mainCtrl',
  'userCtrl',
  'dashCtrl',
  'dataService',
  'dashFilters',
  'socialService'
])
  .config(appRoutes/*function ($httpProvider) {
    // $httpProvider.interceptors.push('AuthInterceptor');
    // myProvider.configable = 'this string was set in config'
  }*/)
  .controller('mainController', mainController)
