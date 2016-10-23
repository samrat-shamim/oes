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

        function insert(data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: baseUrl + 'insert',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        }

        function getById(data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: baseUrl + 'getById',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        }

        this.insert = insert;
        this.manupulate = manupulate;

    }]);
});
