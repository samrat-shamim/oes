define(['angular'], function (angular) {

    var user = angular.module('user-management').controller('deleteUserController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','userService','toastr',
          function (scope, http,$q,$rootScope, dataManupulator,  userService, toastr) {

            scope.pageTitle = "Delete User";
            var userToBeEdited;
            var modalInstance;
            function init() {
              usersToBeDeleted = userService.getUsersToBeDeleted();
              modalInstance = userService.getModal();
              scope.users = usersToBeDeleted;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            scope.deleteUsers = function(){
                var model = {
                  "entityName": "user",
                  "entityIds":[]
                };
                usersToBeDeleted.forEach(function (item) {
                  model.entityIds.push(item._id);
                })
              dataManupulator.manupulate("deleteMany",model).then(
                  function (response) {
                      if(response.data.success){
                          toastr.success("User Deleted", "Success!");
                          $rootScope.$broadcast("user-deleted", {ids:model.entityIds});
                      }
                      else{
                          toastr.success("Something went wrong", "Error!");
                      }

                  }
              );
              scope.cancel();

            }


        }]);


    return user;
});

