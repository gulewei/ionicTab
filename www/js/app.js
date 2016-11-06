// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform,$rootScope) {
  $rootScope.foodPrefix='http://tnfs.tngou.net/image';

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.directive("compile", function($compile) {
        return function(scope,element,attrs){
          scope.$watch(
            function(scope){
              return scope.$eval(attrs.compile);
            },
            function(value){
              element.html(value);
              $compile(element.contents())(scope);
            }
          )
        }
   })


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    if(window.localStorage.hasIntro==undefined){
        $urlRouterProvider.otherwise('/intro');
    }else{
      $urlRouterProvider.otherwise('/tab/dash');
    }

    $ionicConfigProvider.tabs.style("standard");

    $ionicConfigProvider.tabs.position("bottom");

    $ionicConfigProvider.navBar.alignTitle("center");
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('intro',{
      url:'/intro',
      templateUrl:'templates/intro.html',
      controller:'IntroCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,//就像类一样，比较抽象
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.dash-detail', {
    url: '/dash/:dashId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/dash-detail.html',
        controller: 'dashDetailCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.account-detail', {
      url: '/account/:accountId',
      views: {
        'tab-account': {
          templateUrl: 'templates/account-detail.html',
          controller: 'accountDetailCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/intro');

});
