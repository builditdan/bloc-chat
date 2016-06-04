(function() {
  
  function conversationController($scope, conversationTopics) {

    $("#btnOpenFileDialog").hide();
    $scope.conversationList = conversationTopics.all;
    $scope.askConversation = conversationTopics.ask;
    $scope.deleteConversation = conversationTopics.delete;
    $scope.fileOpen = conversationTopics.fOpen;
    //$scope.idSelectedConversation = null;
    
    $("#btnOpenFileDialog").change(conversationTopics.add);
           
  }

  angular
  .module('blocChat')
  .controller('conversationController', ['$scope','conversationTopics', conversationController])
    
})();