var mongoose = require('mongoose');
var RelationSchema = require('../schemas/relation');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var Relation = mongoose.model('Relation', RelationSchema);

module.exports = Relation;