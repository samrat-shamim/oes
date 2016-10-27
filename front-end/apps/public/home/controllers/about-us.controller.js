define(['angular'], function (angular) {


    angular.module('home').controller('aboutUsController',
        ['$rootScope', '$scope', '$http', function ($rootScope, scope, http) {

            scope.message = "About Us";

        }]);
});

