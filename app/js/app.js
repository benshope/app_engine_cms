'use strict';



// Declare app level module which depends on filters, and services

angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ui.bootstrap']).
  config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider.when('/', {templateUrl: 'html/partial1.html', controller: 'MainCtrl'});
    $routeProvider.when('/view2', {templateUrl: 'html/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/view3', {templateUrl: 'html/partial3.html', controller: 'MyCtrl3'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);


'use strict';

angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
      otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }])
.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();
  });
}); 