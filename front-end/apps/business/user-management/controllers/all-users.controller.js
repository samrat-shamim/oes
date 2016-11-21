define(['angular'], function (angular) {

    var users = angular.module('user-management').controller('usersController',
        ['$scope', '$http',"$uibModal",'dataManupulator','userService',
          function (scope, http,$uibModal, dataManupulator, userService) {
          scope.totalItems=0;
          scope.roles = [
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
            scope.pageSize = 10;
            scope.selectedUsers = [];
            scope.$watchCollection("selectedUsers", function(){
                if(scope.selectedUsers.length==1){
                    scope.showMenu = true;
                    scope.multiSelect = false;
                }else if(scope.selectedUsers.length>1){
                    scope.showMenu = true;
                    scope.multiSelect = true;
                }else scope.showMenu = false;
            });

            scope.$on("user-deleted", function (e, arg) {
              if(arg.ids){
                arg.ids.forEach(function (id) {
                  scope.allUsers.forEach(function (item, index) {
                    if (item._id == id){
                      delete scope.allUsers[index];
                      scope.totalItems--;
                        scope.selectedUsers = [];
                    }
                  })
                })
              }
            })

            scope.editSelected = function () {
              userService.setUserToBeEdited(scope.selectedUsers[0]);
             var modal= $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/user-management/views/edit-user-modal.view.html',
                controller: 'editUserController'
              });
                userService.setModal(modal);
            }
            scope.viewSelected = function () {
                userService.setUserToBeViewed(scope.selectedUsers[0]);
              var modal= $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/user-management/views/view-user-modal.view.html',
                controller: 'viewUserController'
              });
                userService.setModal(modal);
            }

            scope.deleteSelected = function () {
                userService.setUsersToBeDeleted(scope.selectedUsers);
              var modal= $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/user-management/views/delete-user-confirmation-modal.view.html',
                controller: 'deleteUserController'
              });
                userService.setModal(modal);
            }

            var getManyFilter = {
                entityName: "user",
                pageNumber:1,
                pageSize: scope.pageSize,
                sort:{},
                filters:{}
            }

          var filter={};
          scope.updateTableByRole = function (flag) {
              if(flag){
                  filter.roles = scope.selectedRole.value
              }
              else{
                  delete filter.roles;
                  scope.selectedRole = null;

              };
              scope.cleared = true;
              scope.loadMore(0, scope.pageSize,null, filter,null, null);

          }

          scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
              scope.loading = true;
              if(!scope.cleared){
                  makePartialSearchFilter(filterByFields);
              }else{
                  scope.cleared = false;
              }

              getManyFilter.pageNumber = currentPage+1;
              getManyFilter.pageSize = pageItems;
              getManyFilter.sort.sortBy = orderBy;
              getManyFilter.filters = filter;
              getAllUser();
            scope.selectedUsers = [];
            }

            function makePartialSearchFilter(object) {
                filter = {};
              for(var key in object){
                if(object[key]){
                    filter[key] = {
                        $regex:object[key]
                    };
                }
              }

            }



            function getAllUser(){
                dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
                    scope.allUsers = response.data.data;
                  scope.totalItems = response.data.totalCount;
                    scope.loading=false;
                })
            }

            scope.pageTitle = "All Users";

            scope.options = {
                scrollbarV: false
            };


          function init() {
          }
          init();
        }]);


    return users;
});

