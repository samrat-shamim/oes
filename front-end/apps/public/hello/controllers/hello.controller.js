define(['angular'], function (angular) {


    angular.module('hello').controller('helloController',
        ['$rootScope', '$scope', '$http', function ($rootScope, scope, http) {

            scope.message = "Rudra";

        }]);
});

