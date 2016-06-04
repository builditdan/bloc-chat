(function() {
  
  function chatController($scope, chatTopics) {

    $scope.chatList = chatTopics.all;
    $scope.deleteChat = chatTopics.delete;
    $scope.addChat = chatTopics.add;
       
  }

  angular
  .module('blocChat')
  .controller('chatController', ['$scope', 'chatTopics', chatController])
    
})();