
var modules;
$.getJSON("mocks/initial-modules.json", function (data) {
    modules = data.modules;
    modules.forEach(function (module) {
        loadDevFiles(module);
    });

});



var appBase = "apps/";

var routes = [];

var infraDeps = [];

var jsPaths = {
    // angular
    'angular': 'bower_components/angular/angular.min',
    'angular_aria': 'bower_components/angular-aria/angular-aria.min',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular_route':"bower_components/angular-route/angular-route.min",
    'angular_animate': 'bower_components/angular-animate/angular-animate.min',
    'angular_sanitize':"bower_components/angular-sanitize/angular-sanitize.min",
    "angular-toastr": "bower_components/angular-toastr/dist/angular-toastr.tpls.min",
        

    // Angular bootstrap
    'angular_ui_bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

    'angular_ocLazyLoad': 'bower_components/oclazyload/dist/ocLazyLoad.min',
    "ngStorage":"bower_components/ngstorage/ngStorage.min",



    //require plugins
    'async': 'bower_components/requirejs-plugins/src/async',
    'font': 'bower_components/requirejs-plugins/src/font',
    'goog': 'bower_components/requirejs-plugins/src/goog',
    'image': 'bower_components/requirejs-plugins/src/image',
    'json': 'bower_components/requirejs-plugins/src/json',
    'noext': 'bower_components/requirejs-plugins/src/noext',
    'mdown': 'bower_components/requirejs-plugins/src/mdown',
    'propertyParser': 'bower_components/requirejs-plugins/src/propertyParser',
    'markdownConverter': 'bower_components/requirejs-plugins/src/Markdown.Converter',

    //General
    'indexController': 'apps/mainApp/Controllers/indexController',
    'mainApp': "apps/mainApp/mainApp.config",
    "envService": "apps/mainApp/services/env.service",
    "landingModule": "apps/public/landing/controllers/landing.controller"

}

var shims = {
    'angular': {
        exports: 'angular'
    },
    'jquery': {
        exports: "$"
    },
    'angular_ocLazyLoad': {
        deps: ['angular']
    },
    'angular-ui-router': {
        deps: ['angular']
    },
    'angular_route': {
        deps: ['angular']
    },
    'angular_ui_bootstrap': {
        deps: ['angular']
    },
    'indexController': {
        deps: ['mainApp', 'envService']
    },
    'envService': {
        deps: ['mainApp']
    },
    'mainApp': {
        deps: ['angular', 'angular-ui-router', 'angular_ui_bootstrap', 'angular_ocLazyLoad', 'ngStorage', 'angular-toastr']
    },
    'appLoader': {
        deps:['mainApp']
    },
    "angular-toastr": {
        "deps": [ "angular_animate", "angular_sanitize" ]
    },
    "angular_animate":{
        deps: ['angular']
    },
    "angular_sanitize":{
        deps: ['angular']
    }
}



$(document).ajaxStop(function () {
    initialize();
});

function loadDevFiles(module) {
    $.get(appBase + module.type + "/" + module.name + "/" + module.name + '.dev.json', function (data) {
        for (var attrname in data.paths) { jsPaths[attrname] = data.paths[attrname]; }
        for (var attrname in data.dependencies) { shims[attrname] = data.dependencies[attrname]; }
        routes[module.name] = data.routes;
        if (module.type == "infrastructure") {
            for (var attrname in data.paths) {
                infraDeps.push(attrname);
            }
        }
    });
}






function initialize() {
    for (var i=0; i<infraDeps.length; i++) {
        shims.mainApp.deps.push(infraDeps[i]);
    }
    require.config({
        urlArgs: "bust=" + (new Date()).getTime(),
        paths: jsPaths,

        // Mention the dependencies
        shim:shims,
        deps: ['mainApp']
    });

    require(['indexController'], function () {
        angular.bootstrap(document, ['mainApp']);
    });
}