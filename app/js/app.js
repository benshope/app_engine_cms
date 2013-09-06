'use strict';

var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ui.bootstrap']).
  config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    $routeProvider.when('/', {templateUrl: 'html/partial1.html', controller: 'MyController'});
    $routeProvider.when('/view2', {templateUrl: 'html/partial2.html', controller: 'MyController'});
    $routeProvider.when('/view3', {templateUrl: 'html/partial3.html', controller: 'MyController'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }])  // Everything after this just allows you to scroll to a place on the destination page
  .run(function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });