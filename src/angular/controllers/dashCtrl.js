angular.module('dashCtrl', ['dataService', 'ServicesModule'])

  .controller('dashController', function (AuthService, UserService, $anchorScroll, $location, $timeout, Table, Team) {
    'ngInject';
    var vm = this;
    vm.onOff = false
    vm.dashFrames = [
      {
        id: 'news',
        name: 'News',
        href: 'html/dash/rss.html'
      },
      {
        id: 'schedule',
        name: 'Schedule',
        href: 'html/dash/schedule.html'
      },
      {
        id: 'table',
        name: 'Table',
        href: 'html/dash/table.html'
      },
      {
        id: 'social',
        name: 'Social',
        href: 'html/dash/social.html'
      }
    ]

    // TODO: get this out of the controller, move it to a factory so that multiple
    // controllers have access to this data
        Team.data(UserService.profile().teamPref)
          .then(function(resp) {
            vm.userTeam = resp.data
            var index = -1;
            // vm.table.standing.forEach(function(cur, i) {
            //   console.log(cur.teamName, vm.userTeam.name);
            //   if (cur.teamName === vm.userTeam.name)
            //     vm.tableIndex = i
            // })
          })
        // console.log('teamPref',vm.teamPref)


      // TODO: This should be moved out of the controller, but no time for that now
      // Table.data()
      // .then(function (resp) {
        vm.table = Table.table
        // console.log('table', vm.table)
      // })

      // var initTableScroll = function(){
      //   $timeout(function() {
      //     // $location.hash('row'+Table.userStanding)
      //     // $anchorScroll()
      //     // console.log(Table.userStanding)
      //   }, 1000)
      // }

      // console.log(Table.userStanding)

    vm.activeFrame = vm.activeFrame || 'news';
    vm.setActive = function (frame) {
      vm.activeFrame = frame
      // console.log(frame)
      // TODO: make this fire as part of the ng-enter (or whatever) for the other ctrls
      //  or their elements... okay, so like, it needs both anchor scrolls? not clear why
      // DONE: I think i've gotten it figured out -- it needs to look like this. Good.
      // The problem now is that it's got a ton of ajax calls, that all need to be moved backwards
      if (frame === 'table'){
        $timeout(function() {
          $anchorScroll('row' + Table.userStanding)
        }, 0)
        // console.log('bang')
      } else if (frame === 'schedule') {
        $timeout(function() {
          $anchorScroll.yOffset = 250;
          $anchorScroll('match' + Table.matchday)
        }, 0)
      }
    }
    // $('body').scrollTop(1000)
    // NB: For getting the table scroll to work. timeout to make sure that the ng-repeat is done
    // make
    // aaaaaand it works!
    // This looks like dead code here?
    // $timeout(function() {
    //   // $location.hash('row15')
    //   // $anchorScroll()
    // }, 2000)

  })



  .controller('rssController', function (Rss, UserService) {
    'ngInject';
    var vm = this;
    vm.activeCard;

    console.log('rssController says hi')

    vm.setActive = function (index) {
      // if they're clicking on the active card, close it
      vm.activeCard = vm.activeCard !== index ? index : null
      // console.log(vm.activeCard)
    }

    // TODO: I can't find a way to do this in the dash crtl and pass it,
    //     so i'm doing it in each controller :/
    Rss.teamFeed(UserService.profile().teamPref)
      .then(function(resp) {
        // console.log('teamfeed resp', resp.data)
        vm.feed = resp.data
      })
  })

  .controller('scheduleController', function (Schedule, UserService, Team, Table) {
    'ngInject';
    var vm = this;
    // vm.table = Table.table
    // vm.matchday = Table.table.matchday
    vm.log = function(val) {console.log(val);}

    vm.setClasses = function(fixture) {
      const out = {
        'played' : false,
        'future' : false,
        'won' : false,
        'lost' : false,
        'draw' : false,
      }
      // TODO: do this elegant (ternary operators, etc)
      var homeGoals = fixture.result.goalsHomeTeam
      var awayGoals = fixture.result.goalsAwayTeam
      var homeName = fixture.homeTeamName
      var awayName = fixture.awayTeamName
      var userGoals;
      var oppGoals;
      // console.log('userteam', vm.userTeam)
      if (vm.userTeam) {
        // console.log(fixture)
        if (vm.userTeam.name === homeName) {
          userGoals = homeGoals
          oppGoals = awayGoals
        } else {
          userGoals = awayGoals
          oppGoals = homeGoals
        }
        // Before this was done w/ the status codes, but those don't seem to mean
        // anything and aren't consistent
        // console.log(homeName, '-', awayName, homeGoals === null)
        out.future = homeGoals === null;
        out.played = !out.future

        if (out.played === true) {
          // console.log('fired')
          // console.log(homeName, '-', awayName, homeGoals, awayGoals, homeGoals === awayGoals )
          if (homeGoals === awayGoals) {
            // console.log('bang')
            out.draw = true
          } else {
            out.won = userGoals > oppGoals
            out.lost = !out.won
          }
        }
      }
      return out
    }


    // I think that this is getting the user's preferred team's schedule,
    // and setting it to vm.userTeam
    Schedule.team(UserService.profile().teamPref)
    .then(function(resp) {
      // console.log('team sched', resp.data)
      vm.schedule = resp.data
    })
    .then(function() {
      // TODO: pass full name along with the team pref(this api blows)
      return Team.data(UserService.profile().teamPref)
    })
    .then(function (resp) {
      // console.log('team data resp', resp.data)
      vm.userTeam = resp.data
    })
    // vm.matchday = vm.table.matchday

    Team.logos()
    .then(function(resp) {
      vm.logos = resp.data
      // console.log(vm.logos)
    })
    Table.data()
      .then(function(resp) {
        vm.table = resp.data
      })

  })

  .controller('tableController', function (Table, UserService, Team, $location) {
    'ngInject';
    var vm = this;
    vm.userTeam = {}
    vm.activeTeam = function (teamName) {
      return teamName === vm.userTeam.name
    }


    Team.data(UserService.profile().teamPref)
      .then(function(resp){
        vm.userTeam = resp.data
        return vm.userTeam
      })
      .then(function (resp) {
        // This then call is vestigial
        vm.table = Table.table
      })

      vm.offset = function() {
        return $('.league-table').outerWidth()
      }

  })

  .controller('socialController', function (UserService, Team, Twitter, $sce) {
    'ngInject';
    var vm = this
    // Twitter.test()
    //   .then(function (resp) {
    //     // console.log(resp.data)
    //     // vm.tweets = $sce.trustAsHtml(resp.data.html)
    //   })
    vm.encodedTweets = []
    Twitter.search(UserService.profile().teamPref)
      .then(function (stream) {
        vm.tweets = stream.data.statuses
        // vm.tweets = vm.tweets.map(cur => cur.id)
        // console.log(vm.tweets)
        return vm.tweets
      })
      .then(function (tweets) {
        // console.log('tweets',tweets)
        // return Twitter.getOne(tweets[0].id_str)
        tweets.forEach(function (cur) {
          Twitter.getOne(cur.id_str)
            .then(function(resp) {
              // console.log('getone response', resp)
              vm.encodedTweets.push( $sce.trustAsHtml(resp.data.html))
            })
        })
        // console.log('encoded',vm.encodedTweets)
      })
      // .then(function (tweet) {
      //   console.log('tweet', tweet)
      //   vm.tweet = $sce.trustAsHtml(tweet.data.html)
      // })

    // Twitter.timeline()
    //   .then(function (resp) {
    //     console.log(resp)
    //     vm.timeline = $sce.trustAsHtml(resp)
    //   })
  })
