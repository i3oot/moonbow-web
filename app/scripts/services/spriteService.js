angular.module('moonbow.services.sprite', ['moonbow.services.backend', 'moonbow.services.user', 'firebase'])

.factory('sprites', function (backend, user, $firebaseSimpleLogin) {
    var spriteEndpoint = backend.child('sprites');

    var saveSprite = function (thetitle, filename, filesize, filetype, dataUrl, makePublic) {
        $firebaseSimpleLogin(spriteEndpoint).$getCurrentUser()
            .then(
                function (currentUser) {
                    var newSprite = {
                        title: thetitle,
                        filename: filename,
                        filesize: filesize,
                        filetype: filetype,
                        public: makePublic,
                        dataUrl: dataUrl,
                        owner: currentUser.uid,
                        created: Firebase.ServerValue.TIMESTAMP
                    };
                    var ref = spriteEndpoint.push();
                    ref.setWithPriority(newSprite, newSprite.public?'public':'private');
                    user.addOwnedSprite(ref.name(), newSprite);
                }
        );

    };

    return {
        saveSprite: saveSprite
    };
});