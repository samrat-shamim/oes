define(['angular'], function (angular) {

    var notice = angular.module('notice').controller('deleteNoticeController',
        ['$scope', '$state','$q',"$rootScope",'dataManupulator','FileUploader','noticeService','toastr',
          function (scope, $state,$q,$rootScope, dataManupulator, FileUploader, noticeService, toastr) {

            scope.pageTitle = "Create Notice";
            var noticeToBeEdited;
            var modalInstance;
            function init() {
              noticesToBeDeleted = noticeService.getNoticesToBeDeleted();
              modalInstance = noticeService.getModal();
              scope.notices = noticesToBeDeleted;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            scope.deleteNotices = function(){
                var model = {
                  "entityName": "notice",
                  "entityIds":[]
                };
                noticesToBeDeleted.forEach(function (item) {
                  model.entityIds.push(item._id);
                })
              dataManupulator.manupulate("deleteMany",model).then(
                  function (response) {
                      toastr.success("Notice deleted", "Success!");
                      $state.go('all-notices');
                  },
                  function (err) {
                      toastr.error("Failed to delete notice", "Error!");
                  }
              );
              scope.cancel();
              $rootScope.$broadcast("notice-deleted", {ids:model.entityIds});
            }


        }]);


    return notice;
});

