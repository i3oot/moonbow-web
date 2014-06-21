'use strict';

/**
 * @ngdoc overview
 * @name moonbowWebApp
 * @description
 * # moonbowWebApp
 *
 * Main module of the application.
 */
angular.module('moonbowWebApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home', {
      url: "/home",
      templateUrl: "views/home.html",
    })

    .state('gallery', {
      url: "/gallery",
      templateUrl: "views/gallery.html",
    })

    .state('me', {
      url: "/me",
      templateUrl: "views/me.html",
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
