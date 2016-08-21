import MainController from './controllers/main.controller.js';
import appRoutes     from './app.route.js';
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
  // 'AuthService',
  // 'UserService',
  // 'mainCtrl',
  'ServicesModule',
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
  // .service('UserService', UserService)
  .controller('MainController', MainController)
