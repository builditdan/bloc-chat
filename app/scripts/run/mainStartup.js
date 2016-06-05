(function() {
  
  function getUsername(userControl) {
    userControl.setUsername();
  }
  
  
  angular
  .module('blocChat')
  .run(['userControl', getUsername])
})();