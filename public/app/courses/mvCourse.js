angular.module('app').factory('mvCourse', function($resource){
    var CouseResource = $resource('/api/courses/:_id', {_id : "@id"}, {
        update: {method: "PUT", isArray: false}
    });

    return CouseResource;
})