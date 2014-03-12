
var app = angular.module('app', ['ui.bootstrap']);

app.controller('Ctrl', function($scope, $http, $window) {
  $scope.url = $window.location.pathname;

  $scope.contact = function() {
    $http.post('/contact', {name: 'Test Name', email: 'Test Email', message: 'Test Body'});
  };

  // $scope.login = function() {
  //   User.login($scope.credentials);
  // };
  // $scope.logout = function() {
  //   User.logout();
  // };
});

// app.factory('User', function($http, $location) {
//   return {
//     login: function(credentials) {
//       var login = $http.post("/user/login", credentials);
//       var login = credentials;
//       login.success(function() {
//         sessionStorage.setItem('authenticated', true);
//       });
//       return login;
//     },
//     logout: function() {
//       var logout = $http.get("/user/logout");
//       logout.success(function() {
//         sessionStorage.removeItem('authenticated');
//       });
//       return logout;
//     },
//     isLoggedIn: function() {
//       return sessionStorage.getItem('authenticated');
//     }
//   };
// });