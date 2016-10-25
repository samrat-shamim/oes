define(['angular'], function (angular) {

    var signUp = angular.module('sign-up').controller('signUpController',
        ['$rootScope', '$scope', '$state', "identifier",'dataManupulator', function ($rootScope, scope, $state, identifier, dataManupulator) {

            var user = {

            };

            scope.signup = function () {
                user.userName = scope.username;
                user.userEmail = scope.email;
                user.phoneNumber = scope.phone;
                user.password = scope.password;
                dataManupulator.manupulate("createAccount", user).then(function(res){
                    console.log(res);
                    $state.go('login');
                })
            }

        }]);

    return signUp;
});
