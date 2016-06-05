(function() {
  
  //https://bloc-chat-7529d.firebaseio.com/
  function chatTopics($firebaseArray, $firebaseObject, userControl) {

    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    
    
    function formatTime(dt) {
      /// formats a javascript Date object into a 12h AM/PM time string
      var date_obj = new Date(dt);
      var hour = date_obj.getHours();
      var minute = date_obj.getMinutes();
      var amPM = (hour > 11) ? "pm" : "am";
      if(hour > 12) {
        hour -= 12;
      } else if(hour == 0) {
        hour = "12";
      }
      if(minute < 10) {
        minute = "0" + minute;
      }
      return hour + ":" + minute + amPM;
    };
    
    function getChatConversation(conversation_id) {
      if (conversation_id === null) {
        bootbox.alert("No converstation selected");                                  
        return;
      };
      var firebaseRef = new Firebase("https://bloc-chat-7529d.firebaseio.com");
   //   firebaseRef.child('chats').orderByChild('roomId').equalTo(conversation_id).on('value', function(snapshot) {
   //     chats = snapshot.val();
   //      snapshot.forEach(function(x) {
  //         alert(x.val().message);
  //       });
  //    });
      chats = $firebaseArray(firebaseRef.child('chats').orderByChild('conversationId').equalTo(conversation_id));
    };
    
    function getChats() {
      return chats;
    };
    
    function deleteChat(elem) {
      result = confirm("Want to delete?");
      if (result) {
        chats.$remove(elem);
      };
    };
    
    function addChat(conversation_id, current_username, chat_message) {
      if (current_username === null) { 
        userControl.setUsername();
        return;
      }
      if (conversation_id === null) {
        bootbox.alert("No converstation selected");                                  
        return;
      }        
        if (chat_message === null || chat_message === "" || !chat_message) {                                             
          bootbox.alert("No message specified");                            
        } else {
          chat = toTitleCase(chat_message);
          var firebaseRef = new Firebase("https://bloc-chat-7529d.firebaseio.com/");
          var chats = $firebaseArray(firebaseRef.child('chats'));
          chats.$add({ username: current_username, message: chat, dateAdded: Date(), conversationId: conversation_id }).then(function(firebaseRef) {
                  var id = firebaseRef.key();
                  chats.$indexFor(id); // returns location in the array
          });
      
        }
    };

  var chats = null;

  return {
    all: getChats,
    get :getChatConversation,
    add: addChat,
    delete: deleteChat
   }

  }
  
  angular
  .module('blocChat')
  .factory('chatTopics',['$firebaseArray', '$firebaseObject', 'userControl', chatTopics]);
  
})();

