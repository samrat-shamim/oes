define(['require'], function (require) {

    var mainApp = angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'oc.lazyLoad']);

    
    angular.module('mainApp').requires.push('sample-navbar');
    modules.forEach(function(module) {
        if (module.type == "infrastructure") {
            angular.module('mainApp').requires.push(module.name);
        }
    });

    mainApp.config(['$urlRouterProvider','$stateProvider', '$httpProvider', '$controllerProvider', '$provide',
    function ($urlRouterProvider, $stateProvider, $httpProvider, $controllerProvider, $provide) {

        mainApp.registerController = $controllerProvider.register;
        mainApp.$register = $provide;

        var appBaseUrl = "apps";

        $stateProvider
            .state('site', {
            'abstract': true,
            resolve: {
                authorize: [
                    'authorizer',
                    function(authorizer) {
                        return authorizer.authorize();
                    }
                ]
            }
        });

        modules.forEach(function (module) {
            if (module.type != "infrastructure") {
                routes[module.name].states.forEach(function (state) {
                    $stateProvider.state(state.name, {
                        url: state.url,
                        data: state.data,
                        controller: state.controller,
                        templateUrl: state.templateUrl,
                        caseInsensitiveMatch: true,
                        resolve: {
                            loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {

                                var deferred = $q.defer();
                                require([state.controller], function () {
                                    $ocLazyLoad.inject(module.name);
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }
                            ],
                            authorize: [
                            'authorizer',
                            function (authorizer) {
                                return authorizer.authorize();
                            }
                            ]
                        }
                    });
                });
            }
            
        });


        $stateProvider
            .state('landing', {
                title: 'Landing',
                url: '/landing',
                data: {

                },
                templateUrl: appBaseUrl + "/public/landing/views/landing.view.html",
                controller: 'landingController',
                caseInsensitiveMatch: true,
                resolve: {
                    loadModule: [
                        '$ocLazyLoad', '$q', function($ocLazyLoad, $q) {
                            var deferred = $q.defer();
                            require(["landingModule"], function() { deferred.resolve(); });
                            return deferred.promise;
                        }
                    ],
                    authorize: [
                            'authorizer',
                            function (authorizer) {
                                return authorizer.authorize();
                            }
                    ]
                }
            })
            .state('home', {
                url: '/home',
                data: {
                    roles: ['user']
                },
                templateUrl: 'apps/public/landing/views/landing.view.html',
                controller: 'landingController'
            })
            .state('access-denied', {
                title: 'access-denied',
                url: '/access-denied',
                data: {
                    
                },
                templateUrl: appBaseUrl + "/others/access-denied.view.html"
            });
            //.state('login', {
            //    title: 'Log In',
            //    url: '/login',
            //    templateUrl: appBaseUrl + "/business/login/views/login.view.html",
            //    controller: 'loginController',
            //    caseInsensitiveMatch: true,
            //    resolve: {
            //        loadModule: [
            //            '$ocLazyLoad', '$q', function($ocLazyLoad, $q) {
            //                var deferred = $q.defer();
            //                require(["loginController"], function() {
            //                    $ocLazyLoad.inject('login');
            //                    deferred.resolve();
            //                });
            //                return deferred.promise;
            //            }
            //        ]
            //    }
            //})
            //.state('register', {
            //    title: 'Sign Up',
            //    url: '/register',
            //    templateUrl: appBaseUrl + "/business/register/views/register.view.html",
            //    controller: 'registerController',
            //    caseInsensitiveMatch: true,
            //    resolve: {
            //        loadModule: [
            //            '$ocLazyLoad', '$q', function($ocLazyLoad, $q) {
            //                var deferred = $q.defer();
            //                require(["registerController"], function() {
            //                    $ocLazyLoad.inject('register');
            //                    deferred.resolve();
            //                });
            //                return deferred.promise;
            //            }
            //        ]
            //    }
            //});

        $urlRouterProvider
            .otherwise('/login');

        $httpProvider.interceptors.push(
           ['$q', '$location',
           function ($q, $location) {
               return {
                   request: function (config) {

                       return config;
                   },

                   response: function (result) {
                       return result;
                   },

                   responseError: function (rejection) {
                       console.log('Failed with', rejection.status, 'status');

                       return $q.reject(rejection);
                   }
               }
           }]);
    }]);

    mainApp.run(function ($rootScope, $state, identifier, authorizer) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (identifier.isIdentityResolved()) authorizer.authorize();
        });
    });

})