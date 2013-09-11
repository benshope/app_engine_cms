'use strict';

var app = angular.module('app', ['ui.bootstrap']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    $routeProvider.when('/', {templateUrl: 'html/page.html', controller: 'PageController'});
    $routeProvider.when('/login', {templateUrl: 'html/login.html', controller: 'LoginController'});
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

app.controller("LoginController", function($scope, $location, User) {
  $scope.credentials = { username: "", password: "" };
  $scope.login = function() {
    User.login($scope.credentials).success( function() {
      $location.path('/home');
    });
  }
});

app.controller("PageController", function($scope, User) {
  $scope.title = "Home";
  $scope.message = "Mouse Over these images to see a directive at work!";

  $scope.logout = function() {
    User.logout();
  };
});

app.directive("showsMessageWhenHovered", function() {
  return {
    link: function(scope, element, attributes) {
      var originalMessage = scope.message;
      element.bind("mouseenter", function() {
        scope.message = attributes.message;
        scope.$apply();
      });
      element.bind("mouseleave", function() {
        scope.message = originalMessage;
        scope.$apply();
      });
    }
  };
});

app.factory("FlashService")

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