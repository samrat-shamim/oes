define(['angular'], function (angular) {

    angular.module('core-services').service('dataManupulator', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";


        function manupulate(action, data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: baseUrl + action,
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        };

        this.manupulate = manupulate;

    }]);
});
