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
        controller: 'mainController',
        templateUrl: '/templates/home.html'

      })

  
}
  
  angular
         .module('blocChat', ['ui.router', 'firebase', 'ngCookies'])
         .config(config);
  
    
})();