define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('applyForExamController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','examService','toastr','identifier',
          function (scope, http,$q,$rootScope, dataManupulator, examService, toastr, identifier) {

            scope.pageTitle = "Apply for exam";
            var examToBeViewed;
            var modalInstance;
            function init() {
                examToBeViewed = examService.getExamToBeViewed();
              modalInstance = examService.getModal();
              scope.exam = examToBeViewed;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            scope.applyForExam = function(transactionId){
                 var connectionModel = {
                 parentEntityId : identifier.identity().userId,
                 childEntityId: examToBeViewed._id,
                 parentEntityName: "user",
                 childEntityName: "exam",
                 tags: ["applied"]
                 }
                 dataManupulator.connect(connectionModel).then(function (res) {
                 }, function (err) {
                 console.log(err);
                 })

                var applicationModel = {
                    entityName: "application",
                    entity: {
                        examId: examToBeViewed._id,
                        examineeId: identifier.identity().userId,
                        amount: examToBeViewed.paymentAmount?examToBeViewed.paymentAmount:0,
                        transactionId: transactionId
                    }
                }
                dataManupulator.manupulate("insert", applicationModel).then(function (res) {
                    res.data.success?toastr.success("Application submitted for verification", "Success!")
                        :toastr.error("Failed to submit application", "Error");
                })
              scope.cancel();
              //$rootScope.$broadcast("exam-deleted", {ids:model.entityIds});
            }


        }]);


    return exam;
});

