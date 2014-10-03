var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Tweets = require('../data/models/tweets.js');
var Auth = require('../util/auth.js');

/* GET root page. */
router.get('/', Auth.isNotAuthenticated, function(req, res) {
  res.render('index', { 
  	title: 'Fritter',
  	user: null
  });
});

/* GET login page*/
router.get('/login', Auth.isNotAuthenticated, function(req, res){
	res.render('login', {
		title: 'Log In', 
		message: undefined,
		user: null
	});
});

/*POST login page */
router.post('/login', Auth.isNotAuthenticated, function(req, res){
	var username = req.body.username;
	var pwrd = req.body.password; 
	User.findOne({'username': username, }, function(err, user){
    	if(user){//found a user
    		if(pwrd !== user.password ){
    			console.log("passwords don't match");
    			req.flash('info', 'Password does not match User Name');
    			res.redirect('/login');
    		}else{//we're good; make name
    			req.session.user = username;
    			res.redirect('/home');
    		}
    	}
    	else{//no username found!
    		console.log("User name doesn't exist!");
    		req.flash('info', "User name doesn't exist!")
    		res.redirect('/login');
    	}
  })
});

router.post('/logout', Auth.isAuthenticated, function(req, res){
	req.session.destroy();
	res.redirect('/');
});

router.get('/home', Auth.isAuthenticated, function(req, res) {
	Tweets
    .find({query: {}, $orderby: {date: -1}})
    .populate('creator', 'username')
    .exec(function(err, tweets){
        if(err){
        	console.log('Error in tweets');
            res.json(err);
        }
        else{
            res.render('home', {
            "title": "Home",
            "user": req.session.user,
            "name": req.session.user,
            "tweets": tweets
            });
        }
	});
});

module.exports = router;
