angular.module('moonbow.services.backend', [])

.factory('backend', function() {
  return new Firebase('https://moonbow.firebaseio.com/');
});
