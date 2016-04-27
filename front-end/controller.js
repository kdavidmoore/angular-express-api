var searchApp = angular.module('searchApp', []);

searchApp.controller('searchController', function($scope, $http){
	$scope.search = function(){
		// how do we handle post requests to this URL? see ../back-end/routes/index.js 
		var apiUrl = 'http://localhost:3000/search';

		// make an http post request with your name in the header
		// on sucess, set the status and result for the scope
		$http({
			method: 'POST',
			url: apiUrl,
			data: {name: "Keith"}
		}).then(function successCallback(response){
				$scope.status = response.status;
				$scope.result = response.config.data.name;
			}, function errorCallback(status){
				$scope.status = 500;
				$scrope.result = 'error';
			});
		}
});