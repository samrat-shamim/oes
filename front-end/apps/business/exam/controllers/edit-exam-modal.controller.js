define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('editExamController',
        ['$scope', '$http','$q','dataManupulator','FileUploader','examService',
          function (scope, http,$q, dataManupulator, FileUploader, examService) {

            scope.pageTitle = "Create Exam";
            var examToBeEdited;
            var modalInstance;
            function init() {
              examToBeEdited = examService.getExamToBeEdited();
              modalInstance = examService.getModal();
              scope.examModel = examToBeEdited;
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
                        placeholder: 'Enter the exam',
                        required: true
                    }
                },
                {
                    key: 'optionA',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option A',
                        placeholder: 'Enter option A',
                        required: true
                    }
                },
                {
                    key: 'optionB',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option B',
                        placeholder: 'Enter option B',
                        required: true
                    }
                },
                {
                    key: 'optionC',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option C',
                        placeholder: 'Enter option C',
                        required: true
                    }
                },
                {
                    key: 'optionD',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option D',
                        placeholder: 'Enter option D',
                        required: true
                    }
                },
                {
                    key: 'correctAnswer',
                    type: 'select',
                    templateOptions: {
                        label: 'Correct Answer',
                        placeholder: 'Select the correct answer',
                        options:[
                            {
                                "name": "Option A",
                                "value": "optionA"
                            },
                            {
                                "name": "Option B",
                                "value": "optionB"
                            },
                            {
                                "name": "Option C",
                                "value": "optionC"
                            },
                            {
                                "name": "Option D",
                                "value": "optionD"
                            }
                        ],
                        required: true
                    }
                },
            ]

            function setImgPathToDatabase(res) {
                if(scope.uploadingImgFor == 'q'){
                    scope.examModel.titleFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'oa'){
                    scope.examModel.optionAFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'ob'){
                    scope.examModel.optionBFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'oc'){
                    scope.examModel.optionCFigure = res.fileName;
                }else if(scope.uploadingImgFor == 'od'){
                    scope.examModel.optionDFigure = res.fileName;
                }
            }

            scope.editExam = function(){
                var model = {
                  "entityName": "exam",
                  "entityId": examToBeEdited._id
                };
                model.entity = scope.examModel;
                dataManupulator.manupulate("update",model);
              scope.cancel();
            }
            var getManyFilter = {
                entityName: "subject",
                pageNumber:1,
                pageSize: 10
            }



            function getAllSubject(){
                return $q(function (resolve, reject) {
                    dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
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


    return exam;
});

