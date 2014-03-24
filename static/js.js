
var app = angular.module('app', ['ui.bootstrap']);

// This needs to accept multi-level routes
// $routeProvider.when('/:name', { templateUrl: 'index.html', controller: Ctrl });

//, $route, $routeParams, $compile
app.controller('Ctrl', function($scope, $sce, $http, $window) {

  // $route.current.templateUrl = 'partials/' + $routeParams.name + ".html";
  // $http.get($route.current.templateUrl).then(function (msg) {
  //   $('#views').html($compile(msg.data)($scope));
  // });

  $scope.url = $window.location.pathname;
  $scope.show_html = true;
  $scope.show_parent_html = true;

  $scope.html_strings = ['first', 'second', 'third'];

  // $scope.current_html = function() { };

  // Direct all routes to this controller
  // Get all url parameters as nested template names
  // If a template level does not exist, look at it's parent, and create it
  // If a template does exist, place it into it's parent

  // Add a timeout function that:
  // Looks at all templates, and deletes any children without parent tags
  // Looks at all templates, and adds an empty string for parent tags

  // $scope.templates = {
  //   root: 'header <page html> home text </page> footer',
  //   page: {
  //     html: ['<line title></line><page html></page>'],
  //     contact: { title: 'contact title',
  //                html: 'contact body']
  //   },
  //   blog: ['blog template'],
  //   post: {
  //     html: ['post template'],
  //     myfirstpost: ['first post content'],
  //     mysecondpost: ['second post content']
  //   }
  // };

  // $scope.html_string = {html:'', visual:''};
  // $scope.$watch('html_string.html', function(html) {
  //       $scope.html_string.visual = $sce.trustAsHtml(newVal);
  // }, true);
  // $scope.$watch('html_string.visual', function(visual) {
  //       $scope.html_string.escaped = $sce.trustAsHtml(visual);
  // }, true);

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