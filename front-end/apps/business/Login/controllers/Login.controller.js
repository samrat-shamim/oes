define(['angular'], function (angular) {

    var login = angular.module('login').controller('loginController',
        ['$rootScope', '$scope', '$state', '$localStorage','$timeout',"identifier",'dataManupulator','toastr',
            function ($rootScope, scope, $state,$localStorage,$timeout, identifier, dataManupulator, toastr) {

            var userInfo = {};
          scope.pageTitle = "Login";

            scope.message = "Please Login";
            scope.login = function () {

                userInfo.userEmail = scope.email;
                userInfo.password = scope.password;

                dataManupulator.manupulate("authenticate", userInfo).then(function(response){
                    if(response.data.user){
                        $localStorage.token = response.data.token;
                        identifier.authenticate({
                            email: response.data.user.userEmail,
                            roles: response.data.user.roles,
                            userName: response.data.user.userName,
                            userId:response.data.user._id,
                            phoneNumber:response.data.user.phoneNumber
                        });
                        if (true) {
                            toastr.success('Login successful!', 'Success');
                            $timeout(function () {
                                $rootScope.$broadcast("loggedin", {role:response.data.user.roles[0]});
                                $state.go('landing');
                            }, 100);

                        }
                    }
                    else if(!response.success){
                        toastr.error('Your credentials are incorrect', 'Error');
                    }
                }, function(err){
                    toastr.error('Something went wrong', 'Error');
                });
            }
            scope.$on("token-validated", function(){
                $state.go('home');
            })

            function init() {
              if(identifier.isAuthenticated()){
                $state.go('home');
              }
            }
            init();

        }]);

    return login;
});
