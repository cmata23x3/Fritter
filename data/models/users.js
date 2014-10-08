var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var User = mongoose.model('User', UserSchema);

module.exports = User;