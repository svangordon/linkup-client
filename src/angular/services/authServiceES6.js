export default class Auth {
  /*@ngInject;*/
  constructor($http, $q, AuthToken, $rootScope) {
    this.$http = $http;
    this.$q = $q;
    this.AuthToken = AuthToken;
    this.$rootScope = $rootScope;
  }

  var authFactory = {}
  // login
  login(username, password) {
    return this.$http.post('http://localhost:5000/api/authenticate', {
      username: username,
      password: password
    })
      .then(function(data) {
        // AuthToken.setToken(data.data.token)
        return data.data
      })
  }

  // logout
  authFactory.logout = function () {
    // clear token
    this.AuthToken.setToken()
  }

  // check if logged in
  authFactory.isLoggedIn = function () {
    if (this.AuthToken.getToken())
      return true
    else
      return false
  }

  // get user info
  authFactory.getUser = function () {
    // console.log('getuser fired')
    if (this.AuthToken.getToken())
      return this.$http.get('http://localhost:5000/api/me')
    else
      return this.$q.reject({message: 'User has no token.'})
  }

  return authFactory

})
