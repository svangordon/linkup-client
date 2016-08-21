import UserService from './user.service.js';
import AuthService from './auth.service.js';
import TokenService from './token.service.js';

angular.module('ServicesModule', [])
  .service('UserService', UserService)
  .service('TokenService', TokenService)
  .service('AuthService', AuthService)
