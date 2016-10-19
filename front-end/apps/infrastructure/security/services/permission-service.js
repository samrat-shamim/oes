define(['angular'], function (angular) {
    angular.module("sercurity").service("permissionService", function () {
        var permissions = {};

        this.addPermission = function (state, permissions) {
            permissions.state = permissions;
        }

        this.isPermitted = function (state, role) {
            if (permissions.state.indexOf(role) > -1) {
                return true;
            }
            else {
                return false;
            }
        }


        return this;
    });
});