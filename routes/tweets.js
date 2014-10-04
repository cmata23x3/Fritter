var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Tweet = require('../data/models/tweets.js');
var Auth = require('../util/auth.js');

/* POST new Tweet data */
router.post('/new', Auth.isAuthenticated, function(req, res){
	User.findOne({'username': req.session.user, }, function(err, user){
		var twee = new Tweet({
			creator: user,
			body: req.body.body, 
		}).save(function(err, doc){
			console.log("saving tweet");
			if(err){
				console.log("Got an error: ", err);
				res.json(err);
			}
			else{    
				res.redirect('../home');
			}
		});
	});
});

/* DELETE a Tweet data */
router.post('/delete', Auth.isAuthenticated, function(req, res){
	console.log(req.body);
	Tweet.findOne({'_id': req.body.id, }, function(err, tweet){
		console.log("This is the tweet found: ", tweet);
		if(tweet){
			Tweet.remove(tweet, function(err, doc){
				res.redirect('../home');
			})
		}
		else{
			redirect('../home');
		}
	})
});

/* POST an edit to a Tweet data */
router.post('/edit', Auth.isAuthenticated, function(req, res){
	var update = {
		body: req.body.body
	}
	Tweet.findOne({'_id': req.body.id, }, function(err, tweet){
		if(tweet){
			Tweet.update(tweet, update, function(err, numberAffected, raw){
				if(err){
					res.json(err);
				}
				else{
					res.redirect('../home');
				}
			})
		}
		else{
			redirect('../home');
		}
	})
});

module.exports = router;