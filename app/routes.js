'use strict';

/**
 * @ngdoc service
 * @requires Task document model
 * @param path {string} path
 */

var Task = require('./models/task');


function getTasks(res){

/**
 * @name  getTasks
 * @param {Object} res response data tasks 
 * @returns sends all Tasks in JSON format
 */
	Task.find(function(err, tasks) {

/**
 * @callback 
 * @throws {Object} err error message
 * if there is an error retrieving, send the error. nothing after res.send(err) will execute
 * @param {Object} tasks data returned from the Task data model
 * send the tasks data in json format
 */
			if (err)
				res.send(err)

			res.json(tasks);
		});
};

/**
 * @module routes
 * @return {Object} response data from GET, POST, DELETE
 * @param {Object} app the express router object
 */

module.exports = function(app) {

	app.get('/api/tasks', function(req, res) {

/**
 * @method GET
 * @param path {string} route path
 * @callback 
 * @param {Object} req GET request
 * @param {Object} res response data
 * @description get all the tasks using mongoose object
 */
	getTasks(res);
	});

	// create Task and send back all Tasks after creation
	app.post('/api/tasks', function(req, res) {

/**
 * @method POST
 * @param path {string} route path
 * @callback 
 * @param {Object} req POST request
 * @param {Object} res response data
 * @description post a new task to the Task model and save
 * creates a Task using AJAX request from Angular
 * retrieves all tasks to the client
 */
	var task = new Task({
		text : req.body.text,
			});
		task.save(function(err, taskData) {
			if (err)
				res.send(err);
			//res.json({msg: "Now you have a new task!"});
			getTasks(res);
		})
		
	});

/**
 * @method DELETE
 * @param path {string} route path
 * @callback 
 * @param  {Object} req DELETE request
 * @param {Object} res response data
 * @description removes a task by its id from the Task document and retrieves
 */
	app.delete('/api/tasks/:task_id', function(req, res) {
		Task.remove({
			_id : req.params.task_id
		}, function(err, task) {
			if (err)
				res.send(err);

			getTasks(res);
		});
	});

/**
 * @method GET
 * @param path {string} any route path
 * @callback
 * @param {Object} req requested data
 * @param {Object} res response data
 * load the single view file, angular will handle the page changes on the front-end
 */

	app.get('*', function(req, res){
	res.sendfile('./public/index.html'); 
	});

};
