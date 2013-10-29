'use strict';

var app = angular.module('app', ['ui.bootstrap']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    $routeProvider.when('/:url', {templateUrl: 'html/page.html', controller: 'PageController'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);

app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });

app.controller("PageController", function($scope, $routeParams, $http) {
  $scope.url = $routeParams.url;
  $scope.message = "Example directive";
  $scope.mail_count = 0;

  $scope.sendmail = function() {
    var data = angular.toJson({request_name: "hello", request_body: "hello2"});
    $http.post("/mail", data);
    $scope.mail_count += 1;
  };

  $scope.getJSON = function() { };
  $scope.postJSON = function() { };

  $scope.login = function() {
    User.login($scope.credentials);
  };
  $scope.logout = function() {
    User.logout();
  };
});


app.factory("User", function($http, $location) {
  return {
    login: function(credentials) {
      var login = $http.post("/user/login", credentials);
      var login = credentials;
      login.success(function() {
        sessionStorage.setItem('authenticated', true);
      });
      return login;
    },
    logout: function() {
      var logout = $http.get("/user/logout");
      logout.success(function() {
        sessionStorage.removeItem('authenticated');
      });
      return logout;
    },
    isLoggedIn: function() {
      return sessionStorage.getItem('authenticated');
    }
  };
});