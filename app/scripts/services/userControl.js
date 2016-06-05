(function() {
  
  function userControl($cookies) {
  
    function getUsername() {
        var current_user = null; //$cookies['blocChatCurrentUser'];
        delete $cookies["blocChatCurrentUser"];
        if (!current_user || current_user === '' || current_user === null) {
            bootbox.prompt({ 
                title: 'Enter username',
                closeButton: false,
                onEscape: false,
                  callback: function(result) {       
                  if (result === null || result === "") {         
                    bootbox.alert("Username required to send messages!");                            
                  } else {
                    $cookies['blocChatCurrentUser'] = result; 
                  }
                }
            });
          }
    }
    
    function getCurrentUser() {
      username =  $cookies['blocChatCurrentUser'];
      if (!username) {
        return null;
      } else {
        return username;
      }
    };
    
    
    return {
      setUsername: getUsername,
      user: getCurrentUser,
     }

  }
  
  angular
  .module('blocChat')
  .factory('userControl',['$cookies', userControl]);
  
})();

