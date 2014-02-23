angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response) {
                if(response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role){
            if(mvIdentity.isAuthorized(role)){
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function(){
            if(mvIdentity.isAuthenticated()){
                return true;
            } else {
                $q.reject('not authorized')
            }
        },
        createUser: function(newUserData){
            var newUser = new mvUser(newUserData);
            var dfr = $q.defer();

            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                dfr.resolve();
            }, function(response){
               dfr.reject(response.data.reason);
            });

            return dfr.promise;
        },
        updateCurrentUser: function(newUserData){
            var dfr = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function(){
                mvIdentity.currentUser = clone;
                dfr.resolve();
            }, function(response){
                dfr.reject(response.data.reason);
            });
            return dfr.promise;
        }
    }
});