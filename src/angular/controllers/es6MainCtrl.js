// Controller for the overarching page
const dependancies = [$rootScope, $location, Auth, User];
export class mainController {
	constructor($rootScope, $location, Auth, User) {
		this.$rootScope = $rootScope;
		this.$location = $location;
		this.Auth = Auth;
		this.User = User;
		this.loginData = {
			username: "",
			password: ""
		};
		this.loggedIn = Auth.isLoggedIn(); // this Auth thing should be looked at. It may be silly.

// TODO: Make this request logical and efficient (ie, make it only once)
// Ah, i think that i'm getting teamPref in a couple of different places, and I'm
// not caching it.
		User.profile()
			.then(function(resp) {
				this.teamPref = resp.data.teamPref
		})

// Set listeners for route change, and update the user data on page load or something?
// I'm not totally certain what this is doing, or why it's here. I'm also not certain
// that context isn't going to change for the various lambdas: comeback and bind them
// if that's the case.
		// check to see if a user is logged in on every request
		$rootScope.$on('$routeChangeStart', () => {
			this.loggedIn = Auth.isLoggedIn();

			// get user information on page load
			Auth.getUser()
				.then((data) => {
					this.user = data.data;
				})
		});

	}
	// var vm = this;
	// alert('bang bang')
	atHome () {
		return $location.path() === '/' || $location.path() === ''
	}
	atSignup() {
		return $location.path() === '/signup' //|| $location.path() === ''
	}

// TODO: move this call to a factory and the urls to the backend
// 'bUrl' is 'backgroundUrl' (that needs to change).
	bUrl() {
		// console.log('fired')
		// Turns out pictures look bad behind the dash
		// if ($location.path() === '/dash'){
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
		if (urls[$location.path()] === undefined)
			console.error(''+ $location.path() +' background not defined');
		return urls[$location.path()] !== undefined ? urls[$location.path()] : ''
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

		Auth.login(this.loginData.username, this.loginData.password)
			.then((data) => {
				this.processing = false;

				// if a user successfully logs in, redirect to users page
				if (data.success)
					$location.path('/dash');
				else
					this.error = data.message;

			});
	};

	// function to handle logging out
	doLogout() {
		Auth.logout();
		this.user = '';

		$location.path('/');
	};


}
