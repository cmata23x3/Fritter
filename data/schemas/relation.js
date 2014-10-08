var mongoose = require('mongoose');

/*
* Defining the Relation Schema. This schema will define how the Relation collection will be organized.
* It has three fields: user, following and followers
*/
var RelationSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true, unique:true}, 
	following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = RelationSchema;