angular.module("sample-navbar").service("sampleService", function () {

    this.setData = function (data) {
        this.data = data;
    }

    this.getData = function () {
        return this.data;
    }

    return this;

});