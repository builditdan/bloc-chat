(function() {
  
  //https://bloc-chat-7529d.firebaseio.com/
  function conversationTopics($firebaseArray, $firebaseObject) {
  
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
    
    function imageIsLoaded(e) {
      alert(e.val());
    };
    
  
    function openfileDialog() {
      $("#btnOpenFileDialog").click();
    };
    
/*****************************
* Public 
* Delete conversation
* @param {Object} elem
*****************************/

    function deleteConversation(elem) {
      result = confirm("Want to delete?");
      if (result) {
        conversations.$remove(elem);
      }
    };
    
     
/*****************************
* Public 
* Add conversation using a bootbox prompt
* @param {Object} e
*****************************/
       
    function addConversation(e) {
      var topic = "";
      var comment = "Just a little sad but but no message have been created for this converstation yet.";
      var image = "";
      
      if (e.target.files[0] != undefined) {
        var input = e.target;
        var reader = new FileReader();
        reader.onload = function() {
          image = reader.result;
          if (image === null || image === "" ) {
            image === "NONE";
          }
          bootbox.prompt("Enter name of conversation to start?", function(result) {                
            if (result === null || result === "") {                                             
              bootbox.alert("No conversation specified");                            
            } else {
              topic = toTitleCase(result);
              conversations.$add({ conversation: topic, last_comment:comment, topic_image:image, dateAdded: Date() }).then(function(firebaseRef) {
                var id = firebaseRef.key();
                conversations.$indexFor(id); // returns location in the array
              });
            }
          });
       };

       reader.readAsDataURL(input.files[0]);
      };
   
   };
    
     
 /*****************************
* Private 
* Prompt for the conversation image
*****************************/

    function askConversation() {
     
      openfileDialog();
      
   };
    
   var firebaseRef = new Firebase("https://bloc-chat-7529d.firebaseio.com/");
   var conversations = $firebaseArray(firebaseRef.child('conversations'));
   var current_conversation = "Pick a room!";
   var current_conversation_id = null;
    
  return {
    all: conversations,
    ask: askConversation,
    add: addConversation,
    delete: deleteConversation,
    fdate: formatDate,
    fOpen: openfileDialog
   }

  }
  
  angular
  .module('blocChat')
  .factory('conversationTopics',['$firebaseArray', '$firebaseObject', conversationTopics]);
  
})();

