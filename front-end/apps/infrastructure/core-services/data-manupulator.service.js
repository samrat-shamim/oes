﻿define(['angular'], function (angular) {

    angular.module('core-services').service('dataManupulator', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var crudBaseUrl = "http://localhost:3000/crud/";
        var authBase = "http://localhost:3000/";
        var base = "http://localhost:3000/";

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
