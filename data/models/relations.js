var mongoose = require('mongoose');
var RelationSchema = require('../schemas/relation');

var Relation = mongoose.model('Relation', RelationSchema);

module.exports = Relation;