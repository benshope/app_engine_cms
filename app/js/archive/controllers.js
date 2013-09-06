'use strict';

/* Controllers */

angular.module('myApp.controllers').
  controller('MainCtrl', ['$scope','$timeout',function($scope, $timeout, friendService) {
  	$scope.friends = friendService.query();
  }]);