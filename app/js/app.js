'use strict';

angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ui.bootstrap']).
  config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {templateUrl: 'html/partial1.html', controller: 'MainCtrl'});
    $routeProvider.when('/view2', {templateUrl: 'html/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/view3', {templateUrl: 'html/partial3.html', controller: 'MyCtrl3'});
    $routeProvider.otherwise({redirectTo: '/'});
  }])  // Everything after this just allows you to scroll to a place on the destination page
  .run(function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });