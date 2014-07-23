var app = angular.module('app', [ 'ui.router', 'ui.bootstrap']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'html/contact.html'
    });

  $urlRouterProvider.otherwise('/');
});

app.controller('PageCtrl', function($scope) { });

// app.controller('ContactCtrl', function($scope, $http) {
//   $scope.submit = function() {
//     $http.post('/email',
//       {name: $scope.contact_name,
//       email: $scope.contact_email,
//       message: $scope.contact_message});
//     $scope.contact_sent = true;
//   };
// });

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
