import UserService from './user.service.js';

angular.module('ServicesModule', ['authService'])
  .service('UserService', UserService)
