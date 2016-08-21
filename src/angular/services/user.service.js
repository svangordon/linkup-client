export default class UserService {
    /*@ngInject;*/
    constructor($http, TokenService, $q, $location) {
      this.$http = $http;
      this.TokenService = TokenService;
      this.$q = $q;
      this.$location = $location;
      this.userProfile = {
        loading: false,
        loaded: false,
        user: null,
        error: null
      };
    }


    login(username, password) {
      this.userProfile.loading = true;
      return this.$http.post('http://localhost:5000/api/authenticate', {
        username: username,
        password: password
      })
        .then((res) => {
          // TokenService.setToken(data.data.token) //passprot ought to handle this now
          this.userProfile.loading = false;
          this.userProfile.loaded = true;
          this.userProfile.user = res.data;
          console.log('userProfile.user ==', this.userProfile.user);
          this.$location.path('/dash');  
        }, (error) => {
          this.userProfile.loading = false;
          this.userProfile.error = error;
          console.error(error);
        })
    }

    // create user
    createUser(userData) {
      return $http.post('http://localhost:5000/api/users', userData)
    }

    // Not used
    // // update user
    // update(id, userData) {
    //   return $http.put('http://localhost:5000/api/users/' + id, userData)
    // }

    // not used
    // // delete user
    // userFactory.delete = function (id) {
    //   return $http.delete('/api/users/' + id)
    // }

    profile() { // This should almost certainly be simplified, so it just returns this.userprofile etc
      // check to see if a call to authorize has populated the user data; if so, return it
      if (this.userProfile.loaded) {
        return this.userProfile.user;
      }
      return null;
    }

    // userFactory.profile()
    //   .then(function(resp){
    //     // console.log('profile response', resp.data)
    //   })
    //
    // return userFactory
  }
