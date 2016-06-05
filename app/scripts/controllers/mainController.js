(function() {
  
  function mainController($scope, mainControl, userControl) {

    $scope.setCurrentConversation = mainControl.setCurr;
    $scope.currentConversation = mainControl.conversation;
    $scope.currentConversationId = mainControl.conversationId;
    $scope.formatDate = mainControl.fdate;
    $scope.currentUser = userControl.user;
  };

  
  angular
  .module('blocChat')
  .controller('mainController', ['$scope', 'mainControl', 'userControl', mainController])
})();