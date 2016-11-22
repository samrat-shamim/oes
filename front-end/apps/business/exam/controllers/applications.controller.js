define(['angular'], function (angular) {

    var application = angular.module('exam').controller('applicationsController',
        ['$scope', '$http', "$uibModal","$state", 'dataManupulator', 'examService',"templateService","identifier",
            function (scope, http, $uibModal,$state, dataManupulator, examService, templateService, identifier) {
                scope.loading = true;
                scope.totalItems = 0;
                scope.applications = [];
                scope.pageSize = 10;
                scope.selectedApplications = [];
                var appType;
                scope.$watchCollection("selectedApplications", function () {
                    if (scope.selectedApplications.length == 1) {
                        scope.showMenu = true;
                        scope.multiSelect = false;
                    } else if (scope.selectedApplications.length > 1) {
                        scope.showMenu = true;
                        scope.multiSelect = true;
                    } else scope.showMenu = false;
                });

                scope.viewSelected = function () {
                    applicationService.setapplicationToBeViewed(scope.selectedapplications[0]);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/application/views/view-application-modal.view.html',
                        controller: 'viewapplicationController'
                    });
                    applicationService.setModal(modal);
                }

                var getManyFilter = {
                    entityName: "application",
                    pageNumber: 1,
                    pageSize: scope.pageSize,
                    sort: {},
                    filters: {}
                }
                
                scope.verify = function () {
                    var payment = scope.selectedApplications[0];
                    payment.paymentVerified = true;
                    dataManupulator.manupulate("update", {entityName:"application", entityId:payment._id, entity: payment}).then(function (res) {
                        var model = {
                            parentEntityId: payment.examineeId,
                            childEntityId: payment.examId,
                            parentEntityName: "user",
                            childEntityName: "exam",
                            tags: "verified"
                        };
                        dataManupulator.connect(model).then(function (res) {
                            console.log(res);
                        })
                    }, function (err) {
                        console.log(err);
                    })
                }

                var filter = {};
                scope.updateTableByapplication = function (flag) {
                    if (flag) {
                        filter.applicationId = scope.selectedapplication._id
                    }
                    else {
                        delete filter.applicationId;
                        scope.selectedapplication = null;

                    }
                    ;
                    scope.loadMore(0, scope.pageSize, null, filter, null, null);

                }

                scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
                    scope.loading = true;
                    makePartialSearchFilter(filterByFields);
                    getManyFilter.pageNumber = currentPage + 1;
                    getManyFilter.pageSize = pageItems;
                    getManyFilter.sort.sortBy = orderBy || orderByReverse;
                    getManyFilter.sort.sortOrder = orderBy?"dsc":"asc";
                    getManyFilter.filters = filter;
                    getAllapplication();
                    scope.selectedapplications = [];
                }

                function makePartialSearchFilter(object) {
                    for (var key in object) {
                        filter[key] = {
                            $regex: object[key]
                        };
                    }

                }
                
                scope.applyTypeFilter = function (type) {
                    if(appType==type) {
                        return;
                    }
                    else {
                        appType = type;
                        getManyFilter.filters["paymentVerified"]=type=="pending"?false:true;
                        getAllapplication();
                    }
                }

                function getAllapplication() {
                    dataManupulator.manupulate("getMany", getManyFilter).then(function (response) {
                        scope.allApplications = response.data.data;
                        scope.totalItems = response.data.totalCount;
                        scope.loading = false;

                        if (angular.isArray(scope.allApplications)) {
                            scope.allApplications.forEach(function (item, index) {
                                dataManupulator.manupulate("getById", {
                                    entityName: 'user',
                                    entityId: item.examineeId
                                }).then(function (res) {
                                    scope.allApplications[index].examinee = res.data;
                                })
                                dataManupulator.manupulate("getById", {
                                    entityName: 'exam',
                                    entityId: item.examId
                                }).then(function (res) {
                                    scope.allApplications[index].exam = res.data;
                                })
                            })
                        }
                    })
                }

                //getAllapplication();

                scope.pageTitle = "All applications";

                scope.options = {
                    scrollbarV: false
                };
                function init() {
                    if(identifier.identity()){
                        scope.roleWeight = templateService.roleWeight[identifier.identity().roles[0]];
                        if(scope.roleWeight<3){
                            $state.go("access-denied");
                        }
                    } else{
                        scope.$on("authenticated", function () {
                            scope.roleWeight = templateService.roleWeight[identifier.identity().roles[0]];
                            if(scope.roleWeight<3){
                                $state.go("access-denied");
                            }
                        })
                    }
                   // getAllapplication();
                }

                init();
            }]);


    return application;
});

