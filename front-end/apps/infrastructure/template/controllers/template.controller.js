define(['angular'], function(angular) {

    var sideBar = angular.module('template').controller('templateController',
    [
        '$rootScope', '$scope', '$state', '$location', "identifier", "templateService", function ($rootScope, scope, $state, $location, identifier, templateService) {
            var vm = this;

            scope.logout = function () {
                identifier.authenticate(null);
                $state.go('login');
                $rootScope.$broadcast("loggedout");
            }
            

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
            if($state.includes(route))
            {
                console.log(route + " is avtive");
                return;
            }
            else
            $state.go(route);
        }
        function getTemplateConfig(){
            templateService.getTemplateConfig().then(function(config){
                scope.config=config;
                angular.forEach(scope.config.leftNavbar, function (a) {
                    scope.menuExpanded[a.title] = false;
                });
            })
        }

            function init() {
                getTemplateConfig();
                scope.$state = $state;
            }

            init();
        }
    ]);
});