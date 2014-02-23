angular.module('app').controller('mvSignupCtrl', function($scope, $location, mvNotifier, mvAuth){
    $scope.signup = function(){
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };

        mvAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('User account created');
            $location.path('/');
        }, function(reason){
            mvNotifier.error(reason);
        });
    }
});