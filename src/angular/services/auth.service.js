export default class AuthService {
  /*@ngInject*/
  constructor($http, $q, TokenService, $rootScope) {
    this.$http = $http;
    this.$q = $q;
    this.TokenService = TokenService;
    this.$rootScope = $rootScope;
  }

  // login
  login(username, password) {
    return this.$http.post('http://localhost:5000/api/authenticate', {
      username: username,
      password: password
    })
      .then(function(data) {
        // TokenService.setToken(data.data.token)
        return data.data
      })
  }

  // logout
  logout() {
    // clear token
    this.TokenService.setToken();
  }

  // check if logged in
  isLoggedIn() {
    return this.TokenService.getToken(); // this is silly. should be a better way.
  }

  // get user info
  getUser() {
    // console.log('getuser fired')
    if (this.TokenService.getToken())
      return this.$http.get('http://localhost:5000/api/me')
    else
      return this.$q.reject({message: 'User has no token.'})
  }
}
