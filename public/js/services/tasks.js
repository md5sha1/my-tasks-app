'use strict';

/**
 * @ngdoc service
 * @name  taskService
 * @description 
 * This is the service we use to make http requests GET, POST, DELETE to the Node API
 */

angular.module('taskService', [])
	.factory('Tasks', ['$http',function($http) {

/**
 * @class factory
 * @param {Object} Tasks service object to make http calls
 * @description 
 * each function returns a task when invoked
 * @returns {Object} promise objects 
 */
		return {
			get : function() {
				return $http.get('/api/tasks');
			},
			create : function(taskData) {
				return $http.post('/api/tasks', taskData);
			},
			delete : function(id) {
				return $http.delete('/api/tasks/' + id);
			}
		}
	}]);

