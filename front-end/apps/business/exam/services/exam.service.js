define(['angular'], function (angular) {

  angular.module('exam').service('examService', ['$http', "$rootScope", "$q", function ($http, $rootScope, $q) {
    var baseUrl = "http://localhost:3000/";
    var examToBeEdited;
    var examsToBeDeleted;
    var activeModal;
    var examToBeViewed;
    var questionFilter;
    var examToBeCreated;
    var examToBeTaken;
    this.questions;

    function setExamToBeTaken(exam){
      examToBeTaken = exam;
    }
    function getExamToBeTaken(){
      return examToBeTaken;
    }


    function setExamToBeEdited(exam) {
      examToBeEdited = exam;
    }

    function getExamToBeEdited() {
      return examToBeEdited;
    }
    function setExamToBeCreated(exam) {
      examToBeCreated = exam;
    }
    function getExamToBeCreated() {
      return examToBeCreated;
    }

    function setExamToBeViewed(exam) {
      examToBeViewed = exam;
    }

    function getExamToBeViewed() {
      return examToBeViewed;
    }

    function setModal(modal) {
      activeModal = modal;
    }

    function getModal() {
      return activeModal;
    }

    function setExamsToBeDeleted(exams) {
      examsToBeDeleted = exams;
    }

    function getExamsToBeDeleted() {
      return examsToBeDeleted;
    }

    function setQuestionFilter(filter) {
      questionFilter = filter;
    }

    function getQuestionFilter() {
      return questionFilter;
    }

    this.setExamToBeEdited = setExamToBeEdited;
    this.getExamToBeEdited = getExamToBeEdited;
    this.setExamsToBeDeleted = setExamsToBeDeleted;
    this.getExamsToBeDeleted = getExamsToBeDeleted;
    this.setModal = setModal;
    this.getModal = getModal;
    this.setExamToBeViewed = setExamToBeViewed;
    this.getExamToBeViewed = getExamToBeViewed;
    this.setQuestionFilter = setQuestionFilter;
    this.getQuestionFilter = getQuestionFilter;
    this.setExamToBeCreated = setExamToBeCreated;
    this.getExamToBeCreated = getExamToBeCreated;
    this.setExamToBeTaken = setExamToBeTaken;
    this.getExamToBeTaken = getExamToBeTaken;
  }]);
});
