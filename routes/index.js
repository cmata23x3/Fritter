var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Tweets = require('../data/models/tweets.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Fritter' });
});

/* GET login page*/
router.get('/login', function(req, res){
	res.render('login', {title: 'Log In'});
});

/*POST login page */
router.post('/login', function(req, res){
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

router.delete('/sessions', function(req, res){
	req.session.destroy();
	res.redirect('/');
});

router.get('/home', function(req, res) {
    // var collection = req.db.collection('usercollection');
    Tweets.find({}, function(err, docs){
        if(err){
            res.json(err);
        }
        else{
            res.render('home', {
            "title": "Home",
            "name": req.session.user,
            "tweets": docs
            });
        }
    });
});

module.exports = router;
