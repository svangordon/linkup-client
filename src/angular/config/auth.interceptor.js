export default class AuthInterceptor{
  /*ngInject*/
  constructor($q, $location, TokenService) {
    this.$q = $q;
    this.$location = $location;
    this.TokenService = TokenService;
  }

  // attach token to every request
  request(config) {
    'ngInject';
    console.log('toke ==', TokenService);
    var token = this.TokenService.getToken()
    if (token)
      config.headers['x-access-token'] = token
    return config
  }

  // redirect if bad token
  responseError(response) {
    if (response.status == 403)
      this.$location.path('/login')
    return this.$q.reject(response)
  }
}
