define(['angular'], function(angular) {

    var sideBar = angular.module('template').controller('templateController',
    [
        '$rootScope', '$scope', '$state', '$location',"$localStorage", "identifier", "templateService","dataManupulator",
        function ($rootScope, scope, $state, $location,$localStorage, identifier, templateService, dataManupulator) {
            var vm = this;

        scope.$on("loggedin", function(e, ar){
            getTemplateConfig(ar.role);
            scope.loggedIn = true;
            scope.userInfo = identifier.identity();
        })

        scope.$on("loggedout", function(e, ar){
            getTemplateConfig('visitor');
            scope.loggedIn = false;
            scope.userInfo = null;
        })


            scope.sideBarContents = [
                {
                    "Name": "Sample One",
                    "Routes": [
                        {
                            "name": "sample-one",
                            "url": "/sample-one"
                        },
                        {
                            "name": "sample-one",
                            "url": "/sample-one"
                        },
                        {
                            "name": "sample-one",
                            "url": "/sample-one"
                        }
                    ]

                }
                ,
                {
                    "Name": "Sample Two",
                    "Routes": [
                        {
                            "name": "sample-two",
                            "url": "/sample-two"
                        }
                    ]

                },
                {
                    "Name": "Expense",
                    "Routes": [
                        {
                            "name": "Expense",
                            "url": "/expense"
                        }
                    ]

                },
                {
                    "Name": "Sector",
                    "Routes": [
                        {
                            "name": "sector",
                            "url": "/sector"
                        }
                    ]

                }
            ];

            scope.menuExpanded = [];



            scope.quickAccessMenu = [
                {
                    "name": "sample-one",
                    "url": "/sample-one",
                    "templateUrl": "apps/business/sample-one/views/sample-one.view.html",
                    "controller": "sampleOneController",
                    "data": {
                        "roles": ['Admin']
                    }
                },
                {
                    "name": "sample-two",
                    "url": "/sample-two",
                    "templateUrl": "apps/business/sample-one/views/sample-two.view.html",
                    "controller": "sampleTwoController",
                    "data": {
                        "roles": ['Admin']
                    }
                }
            ];

        scope.action = function(route, params){
            scope.activeRoute = route + (params?params:"");
            templateService.setStateparams(params);
            $state.go(route);
        }
        function getTemplateConfig(role){
            templateService.getTemplateConfig(role).then(function(config){
                scope.config=config;
                angular.forEach(scope.config.leftNavbar, function (a) {
                    scope.menuExpanded[a.title] = false;
                });
            })
        }

            scope.hideLeftNav = function () {
                scope.hideLeft = !scope.hideLeft;
            }


            function init() {
                dataManupulator.manupulate("validateToken", {}).then(function (response) {
                    if(response.data.success){
                        identifier.authenticate({
                            email: response.data.user.userEmail,
                            roles: response.data.user.roles,
                            userName: response.data.user.userName,
                            phoneNumber: response.data.user.phoneNumber,
                            userId: response.data.user._id
                        });
                        $rootScope.$broadcast("token-validated");
                        scope.loggedIn = true;
                        scope.userInfo = identifier.identity();
                        getTemplateConfig(response.data.user.roles[0]);
                    }else{
                        getTemplateConfig('visitor');
                    }
                }, function (err) {
                    getTemplateConfig('visitor');
                })
                scope.$state = $state;
                scope.hideLeft = false;
            }

            init();
        }
    ]);
});
