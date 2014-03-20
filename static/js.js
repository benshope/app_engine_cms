
var app = angular.module('app', ['ui.bootstrap']);

app.config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'list.html'}).
      when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
      when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
      otherwise({redirectTo:'/'});
  });

// app.config(function ($stateProvider, $urlRouterProvider) {
//   var home = {
//           name: 'home',
//           url: '/',
//           templateUrl: 'content.html'
//       },
//       red = {
//           name: 'red',
//           url: '/red',
//           parent: home,
//           templateUrl: 'content.red.html'
//       },
//       blue = {
//           name: 'blue',
//           url: '/blue',
//           parent: home,
//           templateUrl: 'content.blue.html'
//       },
//       green = {
//           name: 'green',
//           url: '/green',
//           parent: home,
//           templateUrl: 'content.green.html'
//       };

//   $stateProvider.state(home);
//   $stateProvider.state(red);
//   $stateProvider.state(green);
//   $stateProvider.state(blue);
// });



app.controller('Ctrl', function($scope, $sce, $http, $window) {
  $scope.url = $window.location.pathname;
  $scope.text_edit = true;
  $scope.html_string = '';

  $scope.site_html = {
    html: ['header <page name="content"> hero unit, some text </page> footer'],
    page: {
      html: ['<line name="page_title"></line><page name="page_content"></page> '],
      contact: ['contact page data'],
    },
    blog: ['blog template'],
    post: {
      html: ['post template'],
      myfirstpost: ['first post content'],
      mysecondpost: ['second post content']
    }
  };

  $scope.page_url = {  };
  $scope.page_html = {  };

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