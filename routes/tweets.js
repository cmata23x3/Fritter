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
	var query = {'_id': req.body.id};
	Tweet.findOneAndRemove(query, function(err, doc){
		res.redirect('../home');
	});
});

/* POST an edit to a Tweet data */
router.post('/edit', Auth.isAuthenticated, function(req, res){
	var query = {'_id': req.body.id };
	var update = {body: req.body.body};
	Tweet.findOneAndUpdate(query, update, function(err, tweet){
		if(err){
			res.json(err);
		}
		else{
			res.redirect('../home');
		}		
	});
});

module.exports = router;