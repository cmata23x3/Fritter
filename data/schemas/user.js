var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {type: String, required:true, unique:true}, 
	name: {type: String, required:true},
	password: {type: String, required:true}
});

module.exports = UserSchema;