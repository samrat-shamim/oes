define(['angular'], function (angular) {

    var signUp = angular.module('sign-up').controller('profileController',
        ['$rootScope', '$scope', '$state', "identifier",'dataManupulator',"toastr",
            function ($rootScope, scope, $state, identifier, dataManupulator, toastr) {

            var user = {

            };

            scope.resetPassword = function(){
                dataManupulator.manupulate("changePassword",{password: scope.user.password, newPassword: scope.user.newPassword}).then(
                    function (res) {
                        if(res.data.success){
                            toastr.success("Password reset successful", "Success!");
                        } else{
                            toastr.error("Failed to reset password, wrong password provided", "Error!");
                        }

                    },
                    function (err) {
                        toastr.error("Failed to reset password", "Error!");
                    }
                );
            }

        scope.updateProfile = function () {
            user.userName = scope.user.userName;
            user.phoneNumber = scope.user.phoneNumber;
            dataManupulator.manupulate("updateProfile", user).then(
                function (res) {
                    if(res.data.success){
                        toastr.success("Profile updated", "Success!");
                    }else{
                        toastr.error("Failed to update profile, invalid token", "Error!");
                    }
                },
                function (err) {
                    toastr.error("Failed to update profile, something went wrong", "Error!");
                }
            );
        }

        function init(){
            scope.user = identifier.identity();
            scope.$on("token-validated", function () {
                scope.user = identifier.identity();
            })
        }
        init();
        }]);

    return signUp;
});
