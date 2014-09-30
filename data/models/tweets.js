var mongoose = require('mongoose');
var TweetSchema = require('../schemas/tweet');

var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;