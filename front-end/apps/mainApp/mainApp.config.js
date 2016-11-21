define(['require'], function (require) {

    var mainApp = angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'oc.lazyLoad', 'ngStorage', 'ngAnimate', 'toastr']);


    modules.forEach(function(module) {
        if (module.type == "infrastructure") {
            angular.module('mainApp').requires.push(module.name);
        }
    });

    mainApp.config(['$urlRouterProvider','$stateProvider', '$httpProvider', '$controllerProvider', '$provide',"$compileProvider","$sceDelegateProvider",
    function ($urlRouterProvider, $stateProvider, $httpProvider, $controllerProvider, $provide, $compileProvider, $sceDelegateProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        mainApp.registerController = $controllerProvider.register;
        mainApp.$register = $provide;

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|local|file|blob):|data:image\//);
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://localhost:3000/**']);

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
            /*.state('home', {
                url: '/home',
                data: {
                    roles: ['user']
                },
                templateUrl: 'apps/public/landing/views/landing.view.html',
                controller: 'landingController'
            })*/
            .state('access-denied', {
                title: 'access-denied',
                url: '/access-denied',
                data: {

                },
                templateUrl: appBaseUrl + "/others/access-denied.view.html"
            })
        ;

        $urlRouterProvider
            .otherwise('/landing');

      /*  $httpProvider.interceptors.push(
           ['$q', '$location',
           function ($q, $location) {
               return {
                   request: function (config) {

                       config.headers = config.headers || {};
                       if ($localStorage.token) {
                           config.headers.Authorization = 'Bearer ' + $localStorage.token;
                       }
                       return config;
                   },

                   response: function (result) {
                       return result;
                   },

                   responseError: function (response) {
                       if(response.status === 401 || response.status === 403) {
                           $location.path('/login');
                       }

                       return $q.reject(response);
                   }
               }
           }]);*/
    }]);



    mainApp.run(function ($rootScope, $state, identifier, authorizer) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
          if($rootScope.authorized){
            $rootScope.authorized = false;
          }else{
            authorizer.authorize();
            event.preventDefault();
          }
        });
    });

    angular.module('mainApp').run(signWithToken);

    signWithToken.$inject = ["$http", "$q","$location", "$localStorage" ];

    function signWithToken($http,$q, $location, $localStorage ){

        if ($localStorage.token) {
            $http.defaults.headers.common['authToken'] = $localStorage.token;
        }

    }

})
