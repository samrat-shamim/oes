define(['angular'], function (angular) {

    angular.module('notice').service('noticeService', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";
      var noticeToBeEdited;
      var noticesToBeDeleted;
      var activeModal;
      var noticeToBeViewed;


        function manupulate(action, data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: baseUrl + action,
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        };

      function setNoticeToBeEdited(notice) {
        noticeToBeEdited = notice;
      }
      function getNoticeToBeEdited() {
        return noticeToBeEdited ;
      }

      function setNoticeToBeViewed(notice) {
        noticeToBeViewed = notice;
      }
      function getNoticeToBeViewed() {
        return noticeToBeViewed ;
      }

      function setModal(modal) {
        activeModal = modal;
      }
      function getModal() {
        return activeModal;
      }

      function setNoticesToBeDeleted(notices) {
        noticesToBeDeleted = notices;
      }

      function getNoticesToBeDeleted() {
        return noticesToBeDeleted;
      }
      this.manupulate = manupulate;
      this.setNoticeToBeEdited = setNoticeToBeEdited;
      this.getNoticeToBeEdited = getNoticeToBeEdited;
      this.setNoticesToBeDeleted = setNoticesToBeDeleted;
      this.getNoticesToBeDeleted = getNoticesToBeDeleted;
      this.setModal = setModal;
      this.getModal = getModal;
      this.setNoticeToBeViewed = setNoticeToBeViewed;
      this.getNoticeToBeViewed = getNoticeToBeViewed;

    }]);
});
