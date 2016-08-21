angular.module('dataService', ['ServicesModule'])

  // Handle making the various API calls. The heavy lifting should be moved
  // to the server, methinks, and all of these should be looked at. There's a couple
  // of places, if memory serves, where the same function makes the same api call
  // multiple times, because there's no storing of data. That should be fixed.
  // I mean, surely these factories can be stateful -- just have them check if they've
  // got an object and if it's fresh, and if so return that, otherwise get it and
  // return it. I mean, technically, return a promise either way, but whatever.

  .factory('Rss', function($http) {
    var rssFactory = {}

    rssFactory.teamFeed = function (team) {
      // console.log('team feed', team)
      return $http.get('http://localhost:5000/api/rss/team/' + team)
    }

    return rssFactory
  })

  .factory('Schedule', function ($http) {
    var scheduleFactory = {}

    scheduleFactory.team = function(team) {
      return $http.get('http://localhost:5000/api/fd/team/schedule/' + team)
    }

    return scheduleFactory
  })

// TODO: There should be an api route that turns a shortname ('SWA')
// into a long name ('Swansea City AFC')
  .factory('Table', function ($http, UserService, Team) {
    'ngInject';
    var tableFactory = {}

    tableFactory.data = function () {
      return $http.get('http://localhost:5000/api/fd/table')
    }

    // I thought this would work but it doesn't?
    // $http.get('http://localhost:5000/api/fd/table')
    //   .then(function (resp) {
    //     tableFactory.table = resp.data
    //     console.log(tableFactory.table)
    //   })

// TODO: I think that this is slowing things down -- it's making everything wait on this ajax call
    tableFactory.getStanding = () => {
      console.log('team pref ==', UserService.profile().teamPref);
      Team.data(UserService.profile().teamPref)
        .then(function (resp) {
          var teamPref = resp.data
          tableFactory.data()
            .then(function(resp) {
              var table = resp.data.standing
              // console.log(table)
              // var index = -1
              // console.log(teamPref.name, 'team name')
              for (var i = 0; i < table.length; i++) {
                // console.log(table.teamName, teamPref.name)
                if (table[i].teamName === teamPref.name){
                  tableFactory.userStanding = i
                  // console.log(tableFactory.userStanding)
                  break
                }
              }

          })
        })
    }
    const getMatchday = function () {
      tableFactory.data()
        .then (function (resp) {
          tableFactory.table = resp.data
          tableFactory.matchday = resp.data.matchday
        })
    }

    tableFactory.getStanding()
    getMatchday()
    // console.log(tableFactory.userStanding)
    return tableFactory
  })

  .factory('Team', function ($http) {
    var teamFactory = {}

    teamFactory.all = function () {
      return $http.get('http://localhost:5000/api/fd/teams')
    }

    teamFactory.logos = function () {
      return $http.get('http://localhost:5000/api/fd/teams/logos')
    }

    teamFactory.data = function (team) {
      return $http.get('http://localhost:5000/api/fd/team/' + team)
    }

    return teamFactory
  })
