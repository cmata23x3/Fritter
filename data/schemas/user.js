var mongoose = require('mongoose');

/*
* Defining the User Schema. This schema will define how the User collection will be organized.
* It has three fields: username, name and password.
*/
var UserSchema = new mongoose.Schema({
	username: {type: String, required:true, unique:true}, 
	name: {type: String, required:true},
	password: {type: String, required:true}
});

module.exports = UserSchema;