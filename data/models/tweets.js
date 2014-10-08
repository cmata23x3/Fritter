var mongoose = require('mongoose');
var TweetSchema = require('../schemas/tweet');

/*
* Defining the Relation Model to be used in the app. This model will use the corresponding Schema.
*/
var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;