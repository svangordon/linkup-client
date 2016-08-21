export default class TokenService {
  /*@ngInject@*/
  constructor($window) {
    this.$window = $window;
  }

  // get token from local storage
  getToken() {
    return this.$window.localStorage.getItem('token')
  }

  // set or clear token
  setToken(token) {
    if (token)
      this.$window.localStorage.setItem('token', token)
    else
      this.$window.localStorage.removeItem('token')
  }
}
