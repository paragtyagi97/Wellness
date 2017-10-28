angular.module('userServices', [])

.factory('User', function($http){
    var userFactory = {};

    userFactory.create = function(reqData) {
        return $http.post('/route/users', regData);

    }
    return userFactory;
});
