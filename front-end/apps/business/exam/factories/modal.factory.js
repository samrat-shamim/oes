angular.module('question').factory('modalFactory', function (btfModal) {
    function getModal(){
        return btfModal({
            controller: 'editQuestionController',
            controllerAs: 'modal',
            templateUrl: 'apps/business/question/views/edit-question-modal.view.html'
        });
    }
    return {
        getModal:getModal
    }
})