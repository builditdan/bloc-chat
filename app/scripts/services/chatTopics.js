(function() {
  
  //https://bloc-chat-7529d.firebaseio.com/
  function chatTopics($firebaseArray, $firebaseObject, userControl) {


    
/*****************************
* Private 
* Upcases first character of the sentence
* @param {String} str
* @return {String} 
*****************************/

    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    
    
/*****************************
* Public 
* Formats the time for conversations and chat messages
* @param {Date} dt
* @return {String} 
*****************************/

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
    
/*****************************
* Public 
* Gets all chats for the current conversation
* @param {String} conversation_id
* @return {Object} chats 
*****************************/
    
    function getChatConversation(conversation_id) {
      if (conversation_id === null) {
        bootbox.alert("No converstation selected");                                  
        return;
      };
      var firebaseRef = new Firebase("https://bloc-chat-7529d.firebaseio.com");
      chats = $firebaseArray(firebaseRef.child('chats').orderByChild('conversationId').equalTo(conversation_id));
    };

/*****************************
* Public 
* Delete conversation
* @param {Object} elem
*****************************/

    function deleteChat(elem) {
      result = confirm("Want to delete?");
      if (result) {
        chats.$remove(elem);
      }
    };
    
    
/*****************************
* Public 
* Gets chats object
* @return {Object} chats 
*****************************/
    
    function getChats() {
      return chats;
    };
    
/*****************************
* Public 
* Delete specfied chat object
* @param {Object} elem
*****************************/
    
    function deleteChat(elem) {
      result = confirm("Want to delete?");
      if (result) {
        chats.$remove(elem);
      };
    };
    
/*****************************
* Public 
* Add chat to current conversation
* @param {String} conversation_id
* @param {String} current_username
* @param {String} chat_message
*****************************/
    
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
          if (chat.length > 3200) {
            tChat = chat.substring(0, 3200) + "...";
          } else {
            tChat = chat;
          }
          var firebaseRef = new Firebase("https://bloc-chat-7529d.firebaseio.com/");
          var chats = $firebaseArray(firebaseRef.child('chats'));
          chats.$add({ username: current_username, message: tChat, dateAdded: Date(), conversationId: conversation_id }).then(function(firebaseRef) {
                  var id = firebaseRef.key();
                  chats.$indexFor(id); // returns location in the array
          });
          
          //update last converstation
          if (chat.length > 200) {
            last_chat = chat.substring(0, 197) + "... (message truncated)";
          } else {
            last_chat = chat;
          }
          conversationRef = firebaseRef.child('conversations').child(conversation_id);
          conversationRef.update({
            "last_comment" : last_chat
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

