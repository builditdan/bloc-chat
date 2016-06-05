(function() {
  
  //https://bloc-chat-7529d.firebaseio.com/
  function mainControl($firebaseArray, $firebaseObject, chatTopics, $cookies) {
    
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
    
    function formatDate(dt) {
      /// formats a javascript Date object into a 12h AM/PM time string
      var date_obj = new Date(dt);
      var month = date_obj.getMonth() + 1;
      var day = date_obj.getDate();
      var year = date_obj.getFullYear();
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
      return month + "/" + day + "/" + year.toString().slice(-2) + " " + hour + ":" + minute + amPM;
    };
    
 /*****************************
* Public 
* Set the current conversation
* @param {String} conversation name
* @param {String} converstation id
*****************************/

    function setCurrentConversation(conversation,id) {
     current_conversation_id = id;
     current_conversation = conversation;
     chatTopics.get(current_conversation_id)
    };
    
/*****************************
* Public 
* Get the current conversation
* @return {String} conversation name
*****************************/
    
    function getCurrentConversation() {
      return current_conversation;
    };
    
/*****************************
* Public 
* Get the current conversation id
* @return {String} conversation id
*****************************/
    
    function getCurrentConversationId() {
      return current_conversation_id;
    };
    

   var current_conversation = "Pick a room!";
   var current_conversation_id = null;
   
  
  return {
    setCurr: setCurrentConversation,
    conversation: getCurrentConversation,
    conversationId: getCurrentConversationId,
    id: current_conversation_id,
    fdate: formatDate,
    upCaseFirstLetter: toTitleCase
    
   }

  }
  
  angular
  .module('blocChat')
  .factory('mainControl',['$firebaseArray', '$firebaseObject', 'chatTopics', '$cookies', mainControl]);
  
})();

