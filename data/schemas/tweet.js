var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	body: String,
	date: { type: Date, default: Date.now }
});

module.exports = TweetSchema;