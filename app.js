/**
 *@ngdoc module
 *@description
 * Required Modules and Dependencies for our REST API and Server Configuration
 */

/**
 * @description set up
 * @requires express framework, morgan http req logger middleware, body-parser nodejs body parsing middleware, method-override, mongoose, db config file
 * @param path {string} route path
 */
var express = require('express');
var logger = require ('morgan'); 
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var database = require('./config/database'); 			
var app = express();


/**
 * @param {Object} express.static set the static files location /public/img will be /img for users
 * @param path {string} path
 * @param {Object} logger logs to the console in dev format
 * @param {Object} bodyParser parse application/x-www-form-urlencoded
 * @param {Object} bodyParser parse application/json
 * @param {Object} bodyParser parse application/vnd.api+json as json
 * @param {Object} methodoverrride override with the X-HTTP-Method-Override header in the request
 */

app.use(express.static(__dirname + '/public')); 		
app.use(logger('dev')); //
app.use(bodyParser.urlencoded({extended:false, limit: '200kb'}));
app.use(bodyParser.json());//
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 

/**
 * @description creates db connection,
 * connects to mongoDB database on modulus.io
 * @constant {Object} db
 * @constructor Task
 */

var db = mongoose.connection;
db.on('error', console.error);
db.on('open', function(){
console.log('Connected to the remote DB: ' + Date.now());
});
mongoose.connect(database.url); 


/**
 * @description route path for all CRUD Operations
 * @requires file path
 * @param path {string} route path
 * @param {Object} app takes the express app to initialize the routes
 */

require('./app/routes.js')(app);

/**
 * @description port on the process environment or at 9000
 * @type {Number}
 */

var port = process.env.PORT || 9000;

/**
 * @description Initializes the Server
 * {@link http://localhost:9000 Localhost}
 */

app.listen(port, function(){console.log('Express server initialized on port: ' +  port);
			    console.log('http access url: localhost:'+port+'/api');
			});




