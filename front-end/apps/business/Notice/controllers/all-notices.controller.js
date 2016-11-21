define(['angular'], function (angular) {

    var notice = angular.module('notice').controller('noticesController',
        ['$scope', '$http', "$uibModal", 'dataManupulator', 'noticeService',
            function (scope, http, $uibModal, dataManupulator, noticeService) {
                scope.loading = true;
                scope.totalItems = 0;
                scope.notices = [];
                scope.pageSize = 10;
                scope.selectedNotices = [];
                scope.$watchCollection("selectedNotices", function () {
                    if (scope.selectedNotices.length == 1) {
                        scope.showMenu = true;
                        scope.multiSelect = false;
                    } else if (scope.selectedNotices.length > 1) {
                        scope.showMenu = true;
                        scope.multiSelect = true;
                    } else scope.showMenu = false;
                });

                scope.$on("notice-deleted", function (e, arg) {
                    if (arg.ids) {
                        arg.ids.forEach(function (id) {
                            scope.allNotices.forEach(function (item, index) {
                                if (item._id == id) {
                                    delete scope.allNotices[index];
                                    scope.totalItems--;
                                    scope.selectedNotices = [];
                                }
                            })
                        })
                    }
                })

                scope.editSelected = function () {
                    noticeService.setNoticeToBeEdited(scope.selectedNotices[0]);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/notice/views/edit-notice-modal.view.html',
                        controller: 'editNoticeController'
                    });
                    noticeService.setModal(modal);
                }
                scope.viewSelected = function () {
                    noticeService.setNoticeToBeViewed(scope.selectedNotices[0]);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/notice/views/view-notice-modal.view.html',
                        controller: 'viewNoticeController'
                    });
                    noticeService.setModal(modal);
                }

                scope.deleteSelected = function () {
                    noticeService.setNoticesToBeDeleted(scope.selectedNotices);
                    var modal = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: 'apps/business/notice/views/delete-notice-confirmation-modal.view.html',
                        controller: 'deleteNoticeController'
                    });
                    noticeService.setModal(modal);
                }

                var getManyFilter = {
                    entityName: "notice",
                    pageNumber: 1,
                    pageSize: scope.pageSize,
                    sort: {},
                    filters: {}
                }

                var filter = {};
                scope.updateTableByNotice = function (flag) {
                    if (flag) {
                        filter.noticeId = scope.selectedNotice._id
                    }
                    else {
                        delete filter.noticeId;
                        scope.selectedNotice = null;

                    }
                    ;
                    scope.loadMore(0, scope.pageSize, null, filter, null, null);

                }

                scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
                    scope.loading = true;
                    makePartialSearchFilter(filterByFields);
                    getManyFilter.pageNumber = currentPage + 1;
                    getManyFilter.pageSize = pageItems;
                    getManyFilter.sort.sortBy = orderBy;
                    getManyFilter.filters = filter;
                    getAllNotice();
                    scope.selectedNotices = [];
                }

                function makePartialSearchFilter(object) {
                    filter = {};
                    for (var key in object) {
                        filter[key] = {
                            $regex: object[key]
                        };
                    }

                }

                var getAllNoticeFilter = {
                    entityName: "notice",
                    pageNumber: 1,
                    pageSize: 1000000
                }


                function getAllNotice() {
                    dataManupulator.manupulate("getMany", getAllNoticeFilter).then(function (response) {
                        scope.notices = response.data.data;
                    })
                }

                function getAllNotice() {
                    dataManupulator.manupulate("getMany", getManyFilter).then(function (response) {
                        scope.allNotices = response.data.data;
                        scope.totalItems = response.data.totalCount;
                        scope.loading = false;

                        if (angular.isArray(scope.allNotices)) {
                            scope.allNotices.forEach(function (item, index) {
                                dataManupulator.manupulate("getById", {
                                    entityName: 'notice',
                                    entityId: item.noticeId
                                }).then(function (res) {
                                    scope.allNotices[index].notice = res.data.title;
                                })
                            })
                        }
                    })
                }

                //getAllNotice();

                scope.pageTitle = "All Notices";

                scope.options = {
                    scrollbarV: false
                };
                function init() {
                    getAllNotice();
                }

                init();
            }]);


    return notice;
});

