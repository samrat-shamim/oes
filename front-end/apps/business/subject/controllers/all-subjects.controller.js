define(['angular'], function (angular) {

    var subject = angular.module('subject').controller('subjectsController',
        ['$scope', '$http', "$uibModal", 'dataManupulator', 'subjectService',
            function (scope, http, $uibModal, dataManupulator, subjectService) {
                scope.loading = true;
                scope.totalItems = 0;
                scope.subjects = [];
                scope.pageSize = 10;
                scope.selectedSubjects = [];
                scope.$watchCollection("selectedSubjects", function () {
                    if (scope.selectedSubjects.length == 1) {
                        scope.showMenu = true;
                        scope.multiSelect = false;
                    } else if (scope.selectedSubjects.length > 1) {
                        scope.showMenu = true;
                        scope.multiSelect = true;
                    } else scope.showMenu = false;
                });

                scope.$on("subject-deleted", function (e, arg) {
                    if (arg.ids) {
                        arg.ids.forEach(function (id) {
                            scope.allSubjects.forEach(function (item, index) {
                                if (item._id == id) {
                                    delete scope.allSubjects[index];
                                    scope.totalItems--;
                                    scope.selectedSubjects = [];
                                }
                            })
                        })
                    }
                })

                scope.editSelected = function () {
                    subjectService.setSubjectToBeEdited(scope.selectedSubjects[0]);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/subject/views/edit-subject-modal.view.html',
                        controller: 'editSubjectController'
                    });
                    subjectService.setModal(modal);
                }
                scope.viewSelected = function () {
                    subjectService.setSubjectToBeViewed(scope.selectedSubjects[0]);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/subject/views/view-subject-modal.view.html',
                        controller: 'viewSubjectController'
                    });
                    subjectService.setModal(modal);
                }

                scope.deleteSelected = function () {
                    subjectService.setSubjectsToBeDeleted(scope.selectedSubjects);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/subject/views/delete-subject-confirmation-modal.view.html',
                        controller: 'deleteSubjectController'
                    });
                    subjectService.setModal(modal);
                }

                var getManyFilter = {
                    entityName: "subject",
                    pageNumber: 1,
                    pageSize: scope.pageSize,
                    sort: {},
                    filters: {}
                }

                var filter = {};
                scope.updateTableBySubject = function (flag) {
                    if (flag) {
                        filter.subjectId = scope.selectedSubject._id
                    }
                    else {
                        delete filter.subjectId;
                        scope.selectedSubject = null;

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
                    getAllSubject();
                    scope.selectedSubjects = [];
                }

                function makePartialSearchFilter(object) {
                    filter = {};
                    for (var key in object) {
                        filter[key] = {
                            $regex: object[key]
                        };
                    }

                }

                var getAllSubjectFilter = {
                    entityName: "subject",
                    pageNumber: 1,
                    pageSize: 1000000
                }


                function getAllSubject() {
                    dataManupulator.manupulate("getMany", getAllSubjectFilter).then(function (response) {
                        scope.subjects = response.data.data;
                    })
                }

                function getAllSubject() {
                    dataManupulator.manupulate("getMany", getManyFilter).then(function (response) {
                        scope.allSubjects = response.data.data;
                        scope.totalItems = response.data.totalCount;
                        scope.loading = false;

                        if (angular.isArray(scope.allSubjects)) {
                            scope.allSubjects.forEach(function (item, index) {
                                dataManupulator.manupulate("getById", {
                                    entityName: 'subject',
                                    entityId: item.subjectId
                                }).then(function (res) {
                                    scope.allSubjects[index].subject = res.data.title;
                                })
                            })
                        }
                    })
                }

                //getAllSubject();

                scope.pageTitle = "All Subjects";

                scope.options = {
                    scrollbarV: false
                };
                function init() {
                    getAllSubject();
                }

                init();
            }]);


    return subject;
});

