var mongoose = require('mongoose');

var RelationSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true, unique:true}, 
	following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = RelationSchema;