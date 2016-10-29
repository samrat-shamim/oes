define(['angular'], function (angular) {

    var signUp = angular.module('sign-up').controller('signUpController',
        ['$rootScope', '$scope', '$state', "identifier",'dataManupulator',"toastr",
            function ($rootScope, scope, $state, identifier, dataManupulator, toastr) {

            var user = {

            };

            scope.signup = function () {
                user.userName = scope.username;
                user.userEmail = scope.email;
                user.phoneNumber = scope.phone;
                user.password = scope.password;
                dataManupulator.manupulate("createAccount", user).then(function(res){
                   if(res.data.success){
                       toastr.success('Registration successful!', 'Success');
                       $state.go('login');
                   }
                    else{
                       toastr.error(res.data.message, 'Error');
                   }
                })
            }

        }]);

    return signUp;
});
