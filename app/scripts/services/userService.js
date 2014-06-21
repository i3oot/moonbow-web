angular.module('moonbow.services.user', ['moonbow.services.backend', 'firebase'])

.factory('user', function (backend, $firebaseSimpleLogin) {
    var user = null;
    var initComplete = false;
    var profileEndpoint = backend.child('profiles');
    var userEndpoint = backend.child('users');


    var createAccount = function () {

        userEndpoint.child(user.uid).set({
            firstLogin: Firebase.ServerValue.TIMESTAMP,
            lastLogin: Firebase.ServerValue.TIMESTAMP
        });

        profileEndpoint.child(user.uid).set({
            name: user.displayName
        });

    };

    var updateAccount = function (theUser) {
        userEndpoint.child(user.uid).update({
            lastLogin: Firebase.ServerValue.TIMESTAMP
        });
        profileEndpoint.child(user.uid).update({
            name: user.displayName
        });
    };

    var auth = $firebaseSimpleLogin(backend, function (error, theUser) {
        if (error) {
            // an error occurred while attempting login
            console.log(error);
            user = null;
        } else if (theUser) {
            // user authenticated with Firebase
            user = theUser;

            userEndpoint.child(user.uid).once('value', function (snapshot) {
                var exists = (snapshot.val() !== null);
                if (exists) {
                    updateAccount();
                } else {
                    createAccount();
                }
            });

            console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        } else {
            // user is logged out
            console.log('no user');
            user = null;
        }
        initComplete = true;
    });

    return {
        loginWithFacebook: function () {
            auth.$login('facebook', {
                rememberMe: true,
                preferRedirect: true
            });
        },

        logout: function(){
            auth.$logout();   
        },
        
        isLoggedIn: function (callback) {
            
            auth.$getCurrentUser().then(
                function(user){
                    callback(user !== null);
                }
            );
        }
        
    };
});