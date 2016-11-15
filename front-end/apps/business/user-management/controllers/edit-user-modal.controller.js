define(['angular'], function (angular) {

    var user = angular.module('user-management').controller('editUserController',
        ['$scope', '$http','$q','dataManupulator','FileUploader','userService','toastr',
          function (scope, http,$q, dataManupulator, FileUploader, userService, toastr) {

            scope.pageTitle = "Edit User";
            var userToBeEdited;
            var modalInstance;
              var roles = [
                  {
                      name: "Examinee",
                      value:"examinee"
                  },
                  {
                      name: "Examiner",
                      value:"examiner"
                  },
                  {
                      name: "Coordinator",
                      value:"coordinator"
                  }
              ];
            function init() {
              userToBeEdited = userService.getUserToBeEdited();
              modalInstance = userService.getModal();
              scope.userModel = userToBeEdited;
              scope.userModel.phoneNumber = parseInt(userToBeEdited.phoneNumber);
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

              scope.userSchema = [
                  {
                      key: 'roles',
                      type: 'select',
                      templateOptions: {
                          label: 'Role',
                          placeholder: 'Select a role',
                          options:roles,
                          required: true
                      }
                  },
                  {
                      key: 'userName',
                      type: 'input',
                      templateOptions: {
                          type: 'text',
                          label: 'User Name',
                          placeholder: 'Enter the user name',
                          required: true
                      }
                  },
                  {
                      key: 'userEmail',
                      type: 'input',
                      templateOptions: {
                          type: 'email',
                          label: 'User Email',
                          placeholder: 'Enter user email',
                          required: true,
                          disabled: true
                      }
                  },
                  {
                      key: 'phoneNumber',
                      type: 'input',
                      templateOptions: {
                          type: 'number',
                          label: 'Phone Number',
                          placeholder: 'Enter phone number'
                      }
                  },
                  {
                      key: 'password',
                      type: 'input',
                      templateOptions: {
                          type: 'password',
                          label: 'Password',
                          placeholder: 'Enter password',
                          disabled: true
                      }
                  }
              ]

            scope.editUser = function(){
                var model = {
                  "entityName": "user",
                  "entityId": userToBeEdited._id
                };
                scope.userModel.roles = [scope.userModel.roles];
                model.entity = scope.userModel;
                dataManupulator.manupulate("update",model).then(
                    function (response) {
                        if(response.data.success){
                            toastr.success("User updated", "Success!");
                        } else{
                            toastr.error("Failed to update user", "Error!");
                        }

                    },
                    function (err) {
                        toastr.error("Failed to update user", "Error!");
                    }
                );
                scope.cancel();
            }

        }]);


    return user;
});

