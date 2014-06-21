'use strict';

angular.module('moonbowWebApp')
.controller("NavCtrl", function($scope, $window, user){
    $scope.login = user.loginWithFacebook;
    $scope.logout = function(){
        user.logout();
        $window.location.href = '/';
    }
});

