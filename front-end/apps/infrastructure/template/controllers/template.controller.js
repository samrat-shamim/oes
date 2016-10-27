define(['angular'], function(angular) {

    var sideBar = angular.module('template').controller('templateController',
    [
        '$rootScope', '$scope', '$state', '$location',"$localStorage", "identifier", "templateService","dataManupulator",
        function ($rootScope, scope, $state, $location,$localStorage, identifier, templateService, dataManupulator) {
            var vm = this;

        scope.$on("loggedin", function(e, ar){
            getTemplateConfig(ar.role);
        })

        scope.$on("loggedout", function(e, ar){
            getTemplateConfig('visitor');
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

        scope.action = function(route){
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


            function init() {
                dataManupulator.manupulate("validateToken", {token: $localStorage.token}).then(function (response) {
                    if(response.data.userEmail){
                        identifier.authenticate({
                            email: response.data.userEmail,
                            roles: response.data.roles
                        });
                        getTemplateConfig('coordinator');
                    }else{
                        getTemplateConfig('visitor');
                    }
                }, function (err) {
                    getTemplateConfig('visitor');
                })
                scope.$state = $state;
            }

            init();
        }
    ]);
});
