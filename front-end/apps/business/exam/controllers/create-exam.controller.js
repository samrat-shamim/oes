define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('createExamController',
        ['$scope', 'dataManupulator','$q','dataManupulator','identifier',"toastr",
            function (scope, dataManupulator,$q, dataManupulator,  identifier, toastr) {

            scope.pageTitle = "Create Exam";
                scope.generateQuestionAuto = true;

        scope.examModel = {
            subject: "580de2b22b0786194c1ab760",
            difficultyLevel: "primary"
        };
        var subjects = [];

        scope.examSchema = [
          {
            key: 'subjectId',
            type: 'select',
            templateOptions: {
              label: 'Subject',
              placeholder: 'Select a subject',
              options:subjects,
              required: true
            }
          },
            {
                key: 'difficultyLevel',
                type: 'select',
                templateOptions: {
                    label: 'Difficulty Level',
                    placeholder: 'Select a level',
                    options:[
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
                    min:5,
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
                    required: true
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
        ]


        scope.createExam = function(){
            if(scope.generateQuestionAuto){
                getAllQuestion(scope.examModel.subject._id,scope.examModel.difficultyLevel).then(function (response) {
                    if(response.length<scope.examModel.numberOfQuestion){
                        toastr.warning("Please make this question manually!","Insufficient question");
                    }
                });
                /*var model = {
                    "entityName": "exam"
                };
                model.entity = scope.examModel;
                identifier.identity().then(
                    function(res){
                        model.entity.createdById = res.userId;
                        dataManupulator.manupulate("insert",model);
                    }
                )*/
            }
        }
        function getAllQuestion(subId, diffLevel){
            var getManyQuestionFilter = {
                entityName: "question",
                pageNumber:1,
                pageSize: 10000000,
                filters:{
                    subjectId: subId,
                    difficultyLevel:diffLevel
                }
            }
            return $q(function(resolve, reject){
                dataManupulator.manupulate("getMany", getManyQuestionFilter).then(function(response){
                    resolve(response.data.data);
                }, function (error) {
                    reject(error);
                })
            })

        }
      var getManySubjectFilter = {
        entityName: "subject",
        pageNumber:1,
        pageSize: 10
      }



          function getAllSubject(){
           return $q(function (resolve, reject) {
             dataManupulator.manupulate("getMany", getManySubjectFilter).then(function(response){
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

