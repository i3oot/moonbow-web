'use strict';

angular.module('moonbowWebApp.loggedIn', ['moonbow.services.user'])
.directive('loginRequired', function (user) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.addClass('ng-hide');
            user.isLoggedIn(
                function(val){
                    if(val){
                        element.removeClass('ng-hide');
                    }
                }
            );
        }
    };
 })

.directive('isAnonymous', function (user) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.addClass('ng-hide');
            
            user.isLoggedIn(
                function(val){
                    if(!val){
                        element.removeClass('ng-hide');
                    }
                }
            );
        }
    };
 })
;