angular.module("mainApp").service("envService", function () {

    this.userMock = true;
    this.endPoints = {
        auth: "",
        createEntity: "",
        createConnection: "",
        getEntity: "",
        getEntities: "",
        getConnection: "",
        getConnections:""
    };

    return this;

});