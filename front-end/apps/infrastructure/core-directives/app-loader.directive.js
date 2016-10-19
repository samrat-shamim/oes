function constructor() {
    function getAppTemplateUrl(attrs) {
        var appView = attrs.appView || attrs.appName;
        if (attrs.templateUrl || !appView) return attrs.templateUrl;
        var templateUrl = "apps/infrastructure/" + attrs.appName + "/views/" + appView + ".view.html";
        return templateUrl;
    }

    function getTemplateUrl(el, attrs) {
        d.controller = attrs.controller;
        return getAppTemplateUrl(attrs);
    }

    var d= {
        restrict: "EA",
        replace: true,
        scope: { params: '=' },
        bindToController: true,
        templateUrl: getTemplateUrl,
        controller: "controller",
        name: "controller",
        controllerAs: "vm"
    };
    return d;
};

angular.module("core-directives").directive('appLoader', constructor);

