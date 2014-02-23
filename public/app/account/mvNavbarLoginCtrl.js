angular.module('app').controller('mvNavbarLoginCtrl', function ($scope, $http, mvNotifier, mvIdentity, mvAuth, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function(success){
                if(success){
                    mvNotifier.notify('You have successfully signed in');
                } else {
                    mvNotifier.notify('Failed to sing up');
                }
            });
    }
    $scope.signout = function(){
        mvAuth.logoutUser().then(function(success){
               $scope.username = '';
               $scope.password = '';
               mvNotifier.notify('Successfully signed out');
               $location.path('/');
            });
    }
});