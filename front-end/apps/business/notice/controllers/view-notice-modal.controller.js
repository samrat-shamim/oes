define(['angular'], function (angular) {

    var notice = angular.module('notice').controller('viewNoticeController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','FileUploader','noticeService',
          function (scope, http,$q,$rootScope, dataManupulator, FileUploader, noticeService) {

            scope.pageTitle = "Create Notice";
            scope.baseUrl = "http://localhost:3000/";
            scope.bgColor = "background-color: BurlyWood";
            var noticeToBeViewed;
            var modalInstance;
            function init() {
              noticeToBeViewed = noticeService.getNoticeToBeViewed();
              modalInstance = noticeService.getModal();
              scope.notice = noticeToBeViewed;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }


        }]);


    return notice;
});

