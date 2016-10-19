define(['angular'], function (angular) {

    var login = angular.module('sample-navbar').controller('sampleNavbarController',
        ['$rootScope', '$scope', '$state', '$location', 'identifier', function ($rootScope,scope, $state, $location, identifier) {
            var vm = this;

            vm.isActive = function (viewLocation) {

                return viewLocation === $location.path();
            };

            scope.login = function () {
                identifier.authenticate({
                    name: 'Test User',
                    roles: ['user']
                });
                if ($rootScope.returnToState) {
                    $state.go($rootScope.returnToState);
                }
                checkAuth();
            }

            function checkAuth() {
                scope.authenticated = identifier.isAuthenticated();
            }

            scope.logout = function () {
                identifier.authenticate(null);
                checkAuth();
                $state.go('login');
                $rootScope.$broadcast("loggedout");
            }



            scope.name = "Samrat";

            function init() {
                checkAuth();
            }

            init();
        }]);

    return login;
});

