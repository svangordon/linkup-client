import mainController from './controllers/es6MainCtrl';
import appRoutes     from './app.route.js';
import './services/authService';
import './services/services.module.js';
import './controllers/dashCtrl';
import './controllers/userCtrl';
import './services/dataService';
import './services/dashFilters';
import './services/socialService';
import UserService from './services/user.service.js';

angular.module('linkupApp', [
  'ngRoute',
  // appRoutes',
  'authService',
  // 'UserService',
  // 'mainCtrl',
  // 'ServicesModule',
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
  .service('UserService', UserService)
  .controller('mainController', mainController)
