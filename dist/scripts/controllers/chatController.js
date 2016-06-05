(function() {
  
  function chatController($scope, chatTopics) {

    $scope.chatList = chatTopics.all;
    $scope.addChat = chatTopics.add;
    $scope.deleteChat = chatTopics.delete;
       
  }

  angular
  .module('blocChat')
  .controller('chatController', ['$scope', 'chatTopics', chatController])
    
})();