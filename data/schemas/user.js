var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {type: String, required:true, unique:true}, 
	name: {type: String},
	password: String
});

module.exports = UserSchema;