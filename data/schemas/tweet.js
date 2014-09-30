var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
	_id: Number, 
	name: {type: String, ref: 'User'}
	body: String
});

module.exports = TweetSchema;