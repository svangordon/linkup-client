export default class UserService {
    /*@ngInject;*/
    constructor($http, AuthToken, $q) {
      this.$http = $http;
      this.AuthToken = AuthToken;
      this.$q = $q;
      this.userProfile = {
        loading: false,
        loaded: false,
        user: null,
        error: null
      };
    }


// // Move all of this to the constructor once it's a service
//     const vm = this;
//     this.userProfile = {
//       retrieved: false,
//       data: null
//     }

// this is only used in one place, and sort of doesn't make sense so long as there's not a way to edit users
    // // get single user
    // getById(id) {
    //   return $http.get('http://localhost:5000/api/users/' + id)
    // }

// This is probably deprecated
    // // get all users
    // userFactory.all = function () {
    //   return $http.get('http://localhost:5000/api/users')
    // }

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
      if (this.userProfile.retrieved) {
        return this.userProfile.data;
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
