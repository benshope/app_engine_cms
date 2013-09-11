'use strict';

var app = angular.module('app', ['ui.bootstrap']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    $routeProvider.when('/:url', {templateUrl: 'html/page.html', controller: 'PageController'});
    $routeProvider.when('/blog/:url', {templateUrl: 'html/post.html', controller: 'PostController'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);

app.run(function($rootScope, $location, User, $anchorScroll, $routeParams) {
    var routesThatRequireUser = ['/login'];
    $rootScope.$on('$routeChangeStart'), function(event, newRoute, oldRoute) {
      // why the underscore on the line below this one?
      if(_(routesThatRequireUser).contains($location.path()) && !User.isLoggedIn()) {
        $location.path('/login')
      }
    }
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });

app.controller("PageController", function($scope, $routeParams, User) {
  $scope.url = $routeParams.url;
  $scope.message = "Example directive";

  $scope.login = function() {
    User.login($scope.credentials);
  };

  $scope.logout = function() {
    User.logout();
  };
});

app.controller("PostController", function($scope, $routeParams, User) {
  $scope.url = $routeParams.url;
});

app.factory("User", function($http, $location) {
  return {
    login: function(credentials) {
      // var login = $http.post("/user/login", credentials);
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