(function() {
     
  
  function config($stateProvider, $locationProvider) {
     
    $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
     
      $stateProvider
      .state('home', {
        url: '/',
       // controller: 'controller as myController',
        templateUrl: '/templates/home.html'

      })

  
}
  
  angular
         .module('blocChat', ['ui.router', 'firebase'])
         .config(config);
  
    
})();