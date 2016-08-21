	/*@ngInject;*/
export default function($routeProvider, $locationProvider) {
    $routeProvider
      // homepage
      .when('/', {
        templateUrl : 'html/home.html'
        // , controller : 'homeController'
        // , controllerAs : 'home'
      })

      // route for about page
      .when('/about', {
        templateUrl : 'html/about.html'
        // , controller : 'aboutController'
        // , controllerAs : 'about'
      })

      // login route
      .when('/login', {
        templateUrl : 'html/login.html'
        , controller : 'MainController'
        , controllerAs : 'login'
      })

      .when('/dash', {
        templateUrl: 'html/dash/dash.html',
        controller: 'dashController',
        controllerAs: 'vm'
      })

      .when('/signup', {
        templateUrl: 'html/signup.html',
        controller: 'userCreateController',
        controllerAs: 'vm'
      })

      // .otherwise('/')

      //
    var devMode = false;
    if (!devMode) $locationProvider.html5Mode(true)
}
