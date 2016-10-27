define(['angular'], function (angular) {


    angular.module('home').controller('homeController',
        ['$rootScope', '$scope', '$http', function ($rootScope, scope, http) {

            scope.message = "Home Page";

        }]);
});

