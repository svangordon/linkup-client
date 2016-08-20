// Controller for the overarching page
// const dependancies = [$rootScope, $location, Auth, User];
export default class mainController {
	/*@ngInject*/
	constructor($rootScope, $location, Auth, UserService) {
		this.$rootScope = $rootScope;
		this.$location = $location;
		this.Auth = Auth;
		this.User = UserService;
		this.loginData = {
			username: "",
			password: ""
		};
		this.loggedIn = this.Auth.isLoggedIn(); // this Auth thing should be looked at. It may be silly.

// This isn't actually needed, and so should come out as soon as I'm sure it's junk
// // TODO: Make this request logical and efficient (ie, make it only once)
// // Ah, i think that i'm getting teamPref in a couple of different places, and I'm
// // not caching it.
// 		this.User.profile()
// 			.then(function(resp) {
// 				this.teamPref = resp.data.teamPref
// 		})

// This is a dumb way to keep track of this, so out the window it goes.
// // Set listeners for route change, and update the user data on page load or something?
// // I'm not totally certain what this is doing, or why it's here. I'm also not certain
// // that context isn't going to change for the various lambdas: comeback and bind them
// // if that's the case.
// 		// check to see if a user is logged in on every request
// 		$rootScope.$on('$routeChangeStart', () => {
// 			this.loggedIn = this.Auth.isLoggedIn();
//
// 			// get user information on page load
// 			this.User.profile()
// 				.then((data) => {
// 					this.user = data.data;
// 				})
// 		});

	}
	// var vm = this;
	// alert('bang bang')
	atHome () {
		return $location.path() === '/' || this.$location.path() === ''
	}
	atSignup() {
		return this.$location.path() === '/signup' //|| this.$location.path() === ''
	}

// TODO: move this call to a factory and the urls to the backend
// 'bUrl' is 'backgroundUrl' (that needs to change).
	bUrl() {
		// console.log('fired')
		// Turns out pictures look bad behind the dash
		// if (this.$location.path() === '/dash'){
		// 	return teamDashImg(vm.teamPref)
		// }
		var pics = {
			girl: 'https://c2.staticflickr.com/4/3455/3790590480_4bb5c69495_b.jpg',
			stMarys : 'https://c2.staticflickr.com/2/1560/23792983544_d908975115_z.jpg',
			lights : 'https://c2.staticflickr.com/8/7422/12676772194_3053b3eeed_b.jpg',
			champs : 'https://upload.wikimedia.org/wikipedia/commons/3/3a/West_Stand_Champions.jpg'
		}
		var urls = {

			'/signup':pics.stMarys,
			'/' : pics.champs,
			'/dash' : '',
			'/about' : pics.lights
		}
		if (urls[this.$location.path()] === undefined)
			console.error(''+ this.$location.path() +' background not defined');
		return urls[this.$location.path()] !== undefined ? urls[this.$location.path()] : ''
	}

	// teamDashImg(path) {
	// 	path = path.toLowerCase()
	// 	var defaultImg = 'https://c2.staticflickr.com/2/1560/23792983544_d908975115_z.jpg'
	// 	var teams = {
	// 		'afc' : 'https://c2.staticflickr.com/8/7422/12676772194_3053b3eeed_b.jpg'
	// 	}
	// 	return teams[path] !== undefined ? teams[path] : defaultImg
	// }

// Maybe spin off a controller that only handles display / ui things?
	hideNav() {
    $('.button-collapse').sideNav('hide')
  }



	// For guest login
	guest() {
		this.loginData = {
			username: 'guest',
			password: 'password'
		};
	}

	// function to handle login form
	doLogin () {
		console.log('do login fired')
		this.processing = true; // don't think i need this

		this.loginData.username = this.loginData.username.toLowerCase()

		this.Auth.login(this.loginData.username, this.loginData.password)
			.then((data) => {
				this.processing = false;

				// if a user successfully logs in, redirect to users page
				if (data.success)
					this.$location.path('/dash');
				else
					this.error = data.message;

			});
	};

	// function to handle logging out
	doLogout() {
		this.Auth.logout();
		this.user = '';

		this.$location.path('/');
	};


}
