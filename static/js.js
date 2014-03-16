
var app = angular.module('app', ['ui.bootstrap']);

app.controller('Ctrl', function($scope, $http, $window) {
  $scope.url = $window.location.pathname;
  $scope.content = 'CONTENT ORIGINALLY ENTERED HERE';

  $scope.contact = function() {
    $http.post('/contact', {name: 'Test Name', email: 'Test Email', message: 'Test Body'});
  };

  $scope.get_content = function() { $scope.server = $http.get('/database'); };
  $scope.post_content = function() { $http.post('/database', {content: $scope.content}); };

  // $scope.login = function() {
  //   User.login($scope.credentials);
  // };
  // $scope.logout = function() {
  //   User.logout();
  // };
});


app.directive('contenteditable', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return;
        ngModel.$render = function() { element.html(ngModel.$viewValue || ''); };
        element.on('blur keyup change', function() { scope.$apply(read); });
        read();
        function read() {
          var html = element.html();
          if( attrs.stripBr && html == '<br>' ) { html = ''; }
          ngModel.$setViewValue(html);
        }
      }
    };
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