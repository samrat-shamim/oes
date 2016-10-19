define(['angular'], function (angular) {
   angular.module('mainApp').controller('indexController',
        ['$rootScope', '$scope', '$http', '$location', 'identifier', 'envService', function ($rootScope, scope, http, $location, identifier, envService) {
            $rootScope.tryIt = "Hi, printing from root";

            scope.modules = modules;
            scope.isInLogin = function () {

                return "/login" === $location.path();
            };
            $rootScope.$on("loggedin", function() {
                checkAuth();
            });
            $rootScope.$on("loggedout", function () {
                checkAuth();
            });

            function checkAuth() {
                scope.authenticated = identifier.isAuthenticated();
            }

            function init() {
                $('#loader-wrapper').hide();
                checkAuth();
            }

            init();

            scope.name = "Samrat";
            scope.isActive = function (viewLocation) {

                return viewLocation === $location.path();
            };

        }]);
});
