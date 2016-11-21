define(['angular'], function (angular) {

    angular.module('core-services').service('dataManupulator', ['$http', "$rootScope","$q", "envService", function ($http, $rootScope,$q, envService) {
        var crudBaseUrl = envService.base + "crud/";
        var authBase = envService.base;
        var base = envService.base;
    /*  var crudBaseUrl = "http://10.100.107.233:3000/crud/";
      var authBase = "http://10.100.107.233:3000/";
      var base = "http://10.100.107.233:3000/";*/

        var actions = {
            getById: "crud",
            deleteById: "crud",
            deleteMany: "crud",
            getMany: "crud",
            insert: "crud",
            update: "crud",
            createAccount: "auth",
            authenticate: "auth",
            validateToken: "auth"
        }


        function getBaseUrl(action){
            if(actions[action]=="crud"){
                return crudBaseUrl;
            } else if(actions[action] == "auth"){
                return authBase;
            } else{
                return base;
            }
        }


        function manupulate(action, data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: getBaseUrl(action) + action,
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        };

        function connect(data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: "http://localhost:3000/connect",
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        }

        function getConnections(data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: "http://localhost:3000/getConnection",
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        }

        this.manupulate = manupulate;
        this.connect  = connect;
        this.getConnections = getConnections;

    }]);
});
