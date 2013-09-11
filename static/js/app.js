'use strict';

var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    $routeProvider.when('/', {templateUrl: 'html/home.html', controller: 'PageController'});
    $routeProvider.when('/login', {templateUrl: 'html/login.html', controller: 'LoginController'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);

myApp.run(function($rootScope, $location, UserService, $anchorScroll, $routeParams) {
    var routesThatRequireUser = ['/login'];

    $rootScope.$on('$routeChangeStart'), function(event, newRoute, oldRoute) {
      // why the underscore on the line below this one?
      if(_(routesThatRequireUser).contains($location.path()) && !UserService.isLoggedIn()) {
        $location.path('/login')
      }
    }

    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });

  });

myApp.controller("LoginController", function($scope, $location, UserService) {
  $scope.credentials = { username: "", password: "" };
  $scope.login = function() {
    UserService.login($scope.credentials).success( function() {
      $location.path('/home');
    });
  }
});

myApp.controller("PageController", function($scope, UserService) {
  $scope.title = "Home";
  $scope.message = "Mouse Over these images to see a directive at work!";

  $scope.logout = function() {
    UserService.logout();
  };
});

myApp.directive("showsMessageWhenHovered", function() {
  return {
    restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
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

myApp.factory("UserService", function($http, $location) {
  var cacheSession = function() {
    sessionStorage.setItem('authenticated', true);
  };
  var unCacheSession = function() {
    sessionStorage.removeItem('authenticated');
  };

  return {
    login: function(credentials) {
      var login = $http.post("/user/login", credentials);
      login.success(cacheSession);
      return login;
    },
    logout: function() {
      var logout = $http.get("/user/logout");
      logout.success(unCacheSession);
      return logout;
    }
    isLoggedIn: function() {
      return sessionStorage.getItem('authenticated');
    }
  };
});