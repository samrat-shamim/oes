angular.module("dynamic-form").service("dynamicFormService", function () {

    this.setData = function (data) {
        this.data = data;
    }

    this.getData = function () {
        return this.data;
    }

    return this;

});