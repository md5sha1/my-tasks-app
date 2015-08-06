'use strict';

/**
 * @ngdoc module
 * @name  TaskController
 * @description 
 * injects the Tasks service into the main controller
 */

angular.module('taskController', [])

	/**
	 * @name   mainController
	 * @param  {$scope} scope
	 * @param  {$http} service
	 * @param  {Tasks} factory service 
	 */
	
	.controller('mainController', ['$scope','$http','Tasks', function($scope, $http, Tasks) {
		$scope.formData = {};
		$scope.loading = true;

	/**
	 * @method  GET
	 * @callback
	 * @description 
	 * When page loads, get all the Tasks and show them
	 * Use the service to get all the Tasks
	 */
		Tasks.get()
			.then(function(response) {
				$scope.status= response.status;
				$scope.tasks = response.data;
				$scope.loading = false;
			}, function(response) {
				$scope.status= response.status ;
				$scope.tasks = response.data || "Request Failed!";
			});

	/**
	 * @name createTask
	 * @description 
	 * When sumitting the create form, posts data to the Node API
	 */
		$scope.createTask = function() {

	/**
	 * @description
	 * Validate the formData to make sure that something is there
	 * if form is empty, nothing happens
	 */
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

	/**
	 * @description 
	 * call the create function from our service
	 * @name $scope Angular scope object
	 * @method  CREATE
	 * @param {Object} formData	receives data from the form submission
	 * @return {Object} returns a promise object
	 */
				Tasks.create($scope.formData)

	/**
	 * @param  {Expression} callback
	 * @description
	 * on successful creation calls the POST method to get all the Task data
	 * clears the form so user can enter another
	 * assigns new Task data
	 */
				.then(function(response) {
					$scope.loading = false;
					$scope.formData = {};	
					$scope.status= response.status;
					$scope.tasks = response.data;
					
				}, function(response) {
					$scope.status= response.status ;
					$scope.tasks = response.data || "Request Failed!";
				});
					
			}
		};

	/**
	 * @name  deleteTask
	 * @method DELETE
	 * @description 
	 * Delete a Task after after checking it
	 */
		$scope.deleteTask = function(id) {
			$scope.loading = true;

	/**
	 * @description 
	 * call the delete function from our service
	 * @param {string} id a hexadecimal string
	 * specified id to delete
	 */
			Tasks.delete(id)
	/**
	 * @param  {Expression} callback
	 * @description
	 * on successful deletion calls the GET method to get all the Task data
	 * assigns new Task data
	 */			
				.then(function(response) {
					$scope.loading = false;	
					$scope.status= response.status;
					$scope.tasks = response.data;
					
				}, function(response) {
					$scope.status= response.status;
					$scope.tasks = response.data || "Request Failed!";
				});
		};
	}]);