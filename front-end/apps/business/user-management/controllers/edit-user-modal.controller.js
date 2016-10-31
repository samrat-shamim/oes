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
                      value:"Examinee"
                  },
                  {
                      name: "Examiner",
                      value:"Examiner"
                  },
                  {
                      name: "Coordinator",
                      value:"Coordinator"
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

            var uploader= scope.uploader = new FileUploader({
                url: "http://localhost:3000/upload",
                autoUpload: true
            });

            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            scope.uploadInprogress = false;
            scope.uploadingImgFor = null;
            scope.updateUploadingImgInfo = function(info){
                scope.uploadingImgFor = info;
            };

            var subjects = [];

              scope.userSchema = [
                  {
                      key: 'role',
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
            function setImgPathToDatabase(res) {
                if(scope.uploadingImgFor == 'q'){
                    scope.userModel.titleFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'oa'){
                    scope.userModel.optionAFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'ob'){
                    scope.userModel.optionBFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'oc'){
                    scope.userModel.optionCFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'od'){
                    scope.userModel.optionDFigure = res.fileName;
                }
            }

            scope.editUser = function(){
                var model = {
                  "entityName": "user",
                  "entityId": userToBeEdited._id
                };
                model.entity = scope.userModel;
                identifier.identity().then(
                    function(res){
                        model.entity.updatedById = res.userId;
                        dataManupulator.manupulate("update",model).then(
                            function (response) {
                                toastr.success("User updated", "Success!");
                            },
                            function (err) {
                                toastr.error("Failed to update user", "Error!");
                            }
                        );                    }
                )

              scope.cancel();
            }
            var getManyFilter = {
                entityName: "subject",
                pageNumber:1,
                pageSize: 10
            }


            uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function(item) {
                scope.uploadInprogress = true;
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                scope.uploadInprogress = false;
                setImgPathToDatabase(response);
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
            };

        }]);


    return user;
});

