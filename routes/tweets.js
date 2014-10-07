var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Tweet = require('../data/models/tweets.js');
var Auth = require('../util/auth.js');

/* POST new Tweet data */
router.post('/new', Auth.isAuthenticated, function(req, res){
	User.findOne({'username': req.session.user }, function(err, user){
		var twee = new Tweet({
			creator: user,
			body: req.body.body, 
		}).save(function(err, doc){
			if(err){
				res.render('error', {message: err, error: err});
			}
			else{    
				res.redirect('../home');
			}
		});
	});
});

/* POST a retweet (new Tweet data) */
router.post('/retweet', Auth.isAuthenticated, function(req, res){
	User.findOne({'username': req.session.user }, function(err, user){//get the current user
		//create the new tweet; Is gonna be a copy 
		console.log('"@' + req.body.username+ ": " +req.body.body + '"');
		var twee = new Tweet({
			creator: user,
			body: '"@' + req.body.username+ ": " +decodeURI(req.body.body) + '"', 
		}).save(function(err, doc){
			if(err){
				res.render('error', {message: err, error: err});
			}
			else{    
				res.redirect('../home');
			}
		});
	});
});

/* POST a favoriting! */


/* DELETE a Tweet data */
router.post('/delete', Auth.isAuthenticated, function(req, res){
	Tweet.findOneAndRemove({'_id': req.body.id}, function(err, doc){
		if(err){
			res.render('error', {message: err, error: err});
		}
		else{
			res.redirect('../home');
		}
	});
});

/* POST an edit to a Tweet data */
router.post('/edit', Auth.isAuthenticated, function(req, res){
	var query = {'_id': req.body.id };
	var update = {body: req.body.body};
	Tweet.findOneAndUpdate(query, update, function(err, tweet){
		if(err){
			res.render('error', {message: err, error: err});
		}
		else{
			res.redirect('../home');
		}		
	});
});

module.exports = router;