angular.module("mainApp").service("envService", function () {
  var currentStateParams;

  this.userMock = true;
  this.endPoints = {
    auth: "",
    createEntity: "",
    createConnection: "",
    getEntity: "",
    getEntities: "",
    getConnection: "",
    getConnections: ""
  };
  this.base = "http://localhost:3000/";

/*  this.base = "http://10.100.107.233:3000/";
  this.base = "http://10.100.106.45:3000/";*/

});
