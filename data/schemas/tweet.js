var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
	_id: Number,
	name: {type: String, ref: 'User'},
	body: String,
	date: { type: Date, default: Date.now }
});

module.exports = TweetSchema;