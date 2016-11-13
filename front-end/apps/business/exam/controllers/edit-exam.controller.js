define(['angular'], function (angular) {

  var exam = angular.module('exam').controller('editExamController',
    ['$scope', '$state', 'dataManupulator', '$q', "$uibModal", 'dataManupulator', 'identifier', "toastr", "examService",
      function (scope, $state, dataManupulator, $q, $uibModal, dataManupulator, identifier, toastr, examService) {

        scope.pageTitle = "Edit Exam";
        scope.generateQuestionAuto = false;
          var examToBeEdited = examService.getExamToBeEdited();
          if(!examToBeEdited){
              $state.go("all-exams");
          }

        scope.examModel = examToBeEdited;
        var subjects = [];

         scope.examSchema = [
         {
         key: 'subjectId',
         type: 'select',
         templateOptions: {
         label: 'Subject',
         placeholder: 'Select a subject',
         options: subjects,
         required: true
         }
         },
         {
         key: 'difficultyLevel',
         type: 'select',
         templateOptions: {
         label: 'Difficulty Level',
         placeholder: 'Select a level',
         options: [
         {
         name: "Primary",
         value: "Primary"
         },
         {
         name: "Secondary",
         value: "Secondary"
         },
         {
         name: "Expert",
         value: "Expert"
         }
         ],
         required: true
         }
         },
         {
         key: 'title',
         type: 'input',
         templateOptions: {
         type: 'text',
         label: 'Exam Title',
         placeholder: 'Enter the exam title',
         required: true
         }
         },
         {
         key: 'numberOfQuestion',
         type: 'input',
         templateOptions: {
         type: 'number',
         label: 'Number of Question',
         placeholder: 'Enter number of question',
         min: 5,
         required: true
         }
         },
         {
         key: 'schedule',
         type: 'datetimepicker',
         templateOptions: {
         label: 'Exam Schedule',
         required: true,
         datepickerPopup: 'dd-MMMM-yyyy'
         }
         },
         {
         key: 'duration',
         type: 'input',
         templateOptions: {
         type: 'number',
         label: 'Exam Duration',
         placeholder: 'Enter exam duration(minutes)',
         required: true,
         min:5
         }
         },
         {
         key: 'instructions',
         type: 'textarea',
         templateOptions: {
         type: 'textarea',
         label: 'Instructions',
         placeholder: 'Enter instructions'
         }
         },
             {
                 key: 'needApproval',
                 type: 'checkbox',
                 templateOptions: { label: '' },
                 expressionProperties: {
                     'templateOptions.label': function(){
                         return "Need approval?";
                     }
                 }
             },
             {
                 key: 'paymentAmount',
                 type: 'input',
                 expressionProperties: {
                     'templateOptions.placeholder': function(){
                         return "Payment Amount";
                     }
                 },
                 hideExpression: function () {
                     return !scope.examModel.needApproval;
                 },
                 templateOptions: {
                     label: 'Payment Amount',
                     placeholder: 'Enter payment amount',
                     type: "number"
                 }
             },
         ]
       /* scope.examSchema = [
          {
            key: 'subjectId',
            type: 'select',
            templateOptions: {
              label: 'Subject',
              placeholder: 'Select a subject',
              options: subjects
            }
          },
          {
            key: 'difficultyLevel',
            type: 'select',
            templateOptions: {
              label: 'Difficulty Level',
              placeholder: 'Select a level',
              options: [
                {
                  name: "Primary",
                  value: "Primary"
                },
                {
                  name: "Secondary",
                  value: "Secondary"
                },
                {
                  name: "Expert",
                  value: "Expert"
                }
              ]
            }
          },
          {
            key: 'title',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Exam Title',
              placeholder: 'Enter the exam title'
            }
          },
          {
            key: 'numberOfQuestion',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Number of Question',
              placeholder: 'Enter number of question',
              min: 5
            }
          },
          {
            key: 'schedule',
            type: 'datetimepicker',
            templateOptions: {
              label: 'Exam Schedule',
              required: true,
              datepickerPopup: 'dd-MMMM-yyyy'
            }
          },
          {
            key: 'duration',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Exam Duration',
              placeholder: 'Enter exam duration(minutes)',
                min:5
            }
          },
          {
            key: 'instructions',
            type: 'textarea',
            templateOptions: {
              type: 'textarea',
              label: 'Instructions',
              placeholder: 'Enter instructions'
            }
          }
        ]*/


        scope.editExam = function (auto) {
            showQuestionsToAddToExam();
        }
        function showQuestionsToAddToExam() {
          examService.setQuestionFilter({
            subjectId: scope.examModel.subjectId,
            difficultyLevel: scope.examModel.difficultyLevel
          });
            examService.questions = examToBeEdited.questions;
          examService.setExamToBeCreated(scope.examModel);
          showAddQuestionsToExamModal();
        }

        function showAddQuestionsToExamModal() {
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/exam/views/add-questions-to-exam-modal.view.html',
            controller: 'addQuestionsToExamModalController'
          });
          examService.setModal(modal);
        }

        var getManySubjectFilter = {
          entityName: "subject",
          pageNumber: 1,
          pageSize: 10
        }


        function getAllSubject() {
          return $q(function (resolve, reject) {
            dataManupulator.manupulate("getMany", getManySubjectFilter).then(function (response) {
              response.data.data.forEach(function (item) {
                var subject = {
                  name: item.title,
                  value: item._id
                }
                subjects.push(subject);
              })
              resolve(subjects);
            }, function (err) {
              reject(err);
            })
          })
        }

        getAllSubject();

      }]);


  return exam;
});

