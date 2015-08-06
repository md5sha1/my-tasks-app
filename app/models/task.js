/**
 * @description Create a data model using Mongoose object modeling tool for MongoDB
 * @requires  mongoose ODM
 * @type {Object} 
 * @constructor Schema
 * @property {string} ObjectId auto assigned document id
 */

var mongoose = require('mongoose');


var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId; 

var modelStructure = new Schema({
text: {type: String, default: ''},
});

/**
 * @module Task
 * @type {Object} 
 * @description Data model to be exported when required
 */

module.exports = mongoose.model('Task', modelStructure);



