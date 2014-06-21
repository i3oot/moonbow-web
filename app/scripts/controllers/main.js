'use strict';

/**
 * @ngdoc function
 * @name moonbowWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moonbowWebApp
 */
angular.module('moonbowWebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
