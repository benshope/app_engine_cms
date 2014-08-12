var app = angular.module('app', [ 'ui.router', 'ui.bootstrap']);

app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope.$on('$stateChangeSuccess',
    function(event){
      if (!$window.ga)
        return;
      $window.ga('send', 'pageview', { page: $location.path() });
  });
}]);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'Page'
    })
    .state('faq', {
      url: '/faq',
      templateUrl: 'html/faq.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'html/about.html'
    })
    .state('blog', {
      url: '/blog',
      templateUrl: 'html/blog.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'html/contact.html',
      controller: 'Contact'
    });

  $urlRouterProvider.otherwise('/');
});

app.directive('scroll', function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind('scroll', function() {
            scope.scroll = Math.min($window.pageYOffset/100, 1.0);
            scope.$apply();
        });
    };
});

app.controller('Page', function($scope, $window) {
$scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});

app.controller('Contact', function($scope, $http) {
  $scope.submit = function() {
    $http.post('/mail', {
      name: $scope.contact_name,
      email: $scope.contact_email,
      message: $scope.contact_message
    });
    $scope.contact_name = '';
    $scope.contact_email = '';
    $scope.contact_message = '';
    $scope.contact_sent = true;
  };
});

// app.directive('mapDirective', function() {
//   return function (scope, elem, attrs) {
//     var latitude = attrs.latitude && parseFloat(attrs.latitude, 10) || 43.074688;
//     var longitude = attrs.longitude && parseFloat(attrs.longitude, 10) || -89.384294;

//     var mapOptions = {
//       zoom: 8,
//       draggable: false,
//       center: new google.maps.LatLng(latitude, longitude),
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       scrollwheel: false
//     };

//     var map = new google.maps.Map(elem[0], mapOptions);
//   };
// });

// app.directive('contenteditable', function() {
//   return {
//     restrict: 'A',
//     require: '?ngModel',
//     link: function(scope, element, attrs, ngModel) {
//       if(!ngModel) return;
//       ngModel.$render = function() { element.html(ngModel.$viewValue || ''); };
//       element.on('blur keyup change', function() { scope.$apply(read); });
//       read();
//       function read() {
//         var html = element.html();
//         if( attrs.stripBr && html == '<br>' ) { html = ''; }
//         ngModel.$setViewValue(html);
//       }
//     }
//   };
// });
