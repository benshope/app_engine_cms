
// function initialize() {
//     var mapOptions = {
//         zoom: 8,
//         center: new google.maps.LatLng(-34.397, 150.644),
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         scrollwheel: false  
//     };
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
// }
// google.maps.event.addDomListener(window, 'load', initialize);

var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'static/html/home.html',
      controller: 'Ctrl'
    })
    .state('page', {
      url: '/page',
      templateUrl: 'static/html/page.html',
      controller: 'Ctrl'
    })
    .state('post', {
      url: '/post',
      templateUrl: 'static/html/post.html',
      controller: 'Ctrl'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'static/html/contact.html',
      controller: 'Ctrl'
    });
  });

app.controller('Ctrl', function($scope, $http, $window, $stateProvider) {
  $scope.admin = function() {
    //Check if the user is logged in
    return true;
  };

  $scope.url = $window.location.pathname.split('/');

  $scope.data = function() {
    //Check if the sitemap is loaded
    //If the sitemap is not loaded, get it
    //Check if the 
  };

  $scope.submit = function() {
    $http.post('/email', 
      {name: $scope.contact_name, 
      email: $scope.contact_email, 
      message: $scope.contact_message});
    $scope.contact_sent = true;
  };

  // $scope.show_html = true;
  // $scope.show_parent_html = true;
  // $scope.tint = false;
  // $scope.html_strings = {};

  // $scope.get_content = function() { $scope.server = $http.get('/database'); };
  // $scope.post_content = function() { $http.post('/database', {content: $scope.content}); };

  // $scope.load_page = function() {
  //   $scope.html_strings = {};
  //   var url = $scope.url;
  //   var data = partials;
  //   for (var x = 0; x < url.length; x++) {
  //     $scope.html_strings[x] = data[''];
  //     data = data[url[x+1]];
  //   }
  // };
});

app.directive('mapDirective', function() {
  return function (scope, elem, attrs) {
    var latitude = attrs.latitude && parseFloat(attrs.latitude, 10) || 43.074688;
    var longitude = attrs.longitude && parseFloat(attrs.longitude, 10) || -89.384294;

    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false  
    };

    var map = new google.maps.Map(elem[0], mapOptions);
  };
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


// $scope.login = function() {
//   User.login($scope.credentials);
// };
// $scope.logout = function() {
//   User.logout();
// };


// $scope.html_string = {html:'', visual:''};
// $scope.$watch('html_string.html', function(html) {
//       $scope.html_string.visual = $sce.trustAsHtml(newVal);
// }, true);
// $scope.$watch('html_string.visual', function(visual) {
//       $scope.html_string.escaped = $sce.trustAsHtml(visual);
// }, true);


// app.factory('User', function($http, $location) {
//   return {
//     login: function(credentials) {
//       var login = $http.post('/user/login', credentials);
//       var login = credentials;
//       login.success(function() {
//         sessionStorage.setItem('authenticated', true);
//       });
//       return login;
//     },
//     logout: function() {
//       var logout = $http.get('/user/logout');
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

