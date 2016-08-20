angular.module('userCtrl', ['ServicesModule'])

.service()

// controller applied to user creation page
.controller('userCreateController', function(User, Team, $location, $timeout, Auth, AuthToken, $window) {
	'ngInclude';
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	vm.userData = {  }

	vm.log = function (val) {console.log('log:',val);}

	Team.all()
		.then(function(resp) {
			vm.teams = resp.data.teams

			// TODO: Turn this into a $digest or something?
			$timeout(function() {
        $('select').material_select()
      }, 0)

		})

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		var password = vm.userData.password
		// use the create function in the UserService
		User.createUser(vm.userData)
			.then(function(resp) {
				vm.processing = false;
				vm.userData = {  }
				return resp.data
			})
			.then(function (user) {
				Auth.login(user.username, password)
					.then(function(data) {
						vm.processing = false;

						// if a user successfully logs in, redirect to users page
						if (data.success){
							$location.path('/dash');
						}

					});

			})



	};

})
