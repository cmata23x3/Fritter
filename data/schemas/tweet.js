var mongoose = require('mongoose');

/*
* Defining the Tweet Schema. This schema will define how the Tweet collection will be organized.
* It has three fields: creator, body and date
*/
var TweetSchema = new mongoose.Schema({
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	body: String,
	date: { type: Date, default: Date.now }
});

module.exports = TweetSchema;