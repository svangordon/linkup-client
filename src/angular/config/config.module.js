import AuthInterceptor  from './auth.interceptor.js';
import AppRoutes        from './app.routes.js';

angular.module('ConfigModule', [])
  .config(AppRoutes)
  .config(($provide, $httpProvider) => {
    'ngInject';
    $provide.service('AuthInterceptor', AuthInterceptor);
    $httpProvider.interceptors.push('AuthInterceptor');
  })
