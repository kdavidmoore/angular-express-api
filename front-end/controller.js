var searchApp = angular.module('searchApp', []);

searchApp.controller('searchController', function($scope, $http){
	// how do we handle requests to this URL? see ../back-end/routes/index.js 
	var apiUrl = 'http://localhost:3000/search';
	
	function getAllCars(){
		// make an http get request that returns all the cars
		$http({
			method: 'GET',
			url: apiUrl,
		}).then(function successCallback(response){
			if (response.data.length < 1){
				$scope.results = ['No results.'];
			} else {
				$scope.results = response.data;
			}
		}, function errorCallback(status){
			$scope.results = 'Error: ' + status;
		});
	}

	// on load, get all cars in the database
	getAllCars();

	$scope.search = function(){
		// make an http post request with your name in the header
		// on sucess, set the status and result for the scope
		$http({
			method: 'POST',
			url: apiUrl,
			data: {name: $scope.carToAdd}
		}).then(function successCallback(response){
			if (response.data.length < 1){
				$scope.results = ['No results.'];
			} else {
				$scope.results = response.data;
			}
		}, function errorCallback(status){
			$scope.results = 'Error: ' + status;
		});
	}
});