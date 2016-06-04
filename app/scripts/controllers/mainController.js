(function() {
  
  function mainController($scope, mainControl) {

    $scope.setCurrentConversation = mainControl.setCurr;
    $scope.currentConversation = mainControl.conversation;
    $scope.currentConversationId = mainControl.conversationId;
    $scope.formatDate = mainControl.fdate;
    $scope.currentUser = mainControl.user;

           
  }

  angular
  .module('blocChat')
  .controller('mainController', ['$scope', 'mainControl', mainController])
    
})();