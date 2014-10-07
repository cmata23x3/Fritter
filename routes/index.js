var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Tweet = require('../data/models/tweets.js');
var Relation = require('../data/models/relations.js');
var Auth = require('../util/auth.js');
var helper = require('../util/helper.js')

/* GET root page. */
router.get('/', Auth.isNotAuthenticated, function(req, res) {
  res.render('index', { 
  	title: 'Fritter',
  	user: null,
    name: null
});
});

/* GET login page*/
router.get('/login', Auth.isNotAuthenticated, function(req, res){
	res.render('login', {
		title: 'Log In', 
		message: undefined,
		user: null,
        name: null
    });
});

/*POST login info */
router.post('/login', Auth.isNotAuthenticated, function(req, res){
	var username = req.body.username;
	var pwrd = req.body.password; 
	User.findOne({'username': username, }, function(err, user){
    	if(user){//found a user
    		if(pwrd !== user.password ){
    			console.log("passwords don't match");
    			req.flash('info', 'Password does not match User Name');
    			res.redirect('/login');
    		}
            else{//we're good; make name
            req.session.user = user.username;
            req.session._id = user._id
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

/*POST logout info */
router.post('/logout', Auth.isAuthenticated, function(req, res){
	req.session.destroy();
	res.redirect('/');
});

/*GET home page */
router.get('/home', Auth.isAuthenticated, function(req, res){
    //Get followers & following
    Relation
    .findOne({user: req.session._id})
    .populate([{path:'following', select:'name username'}, {path:'followers', select:'name username'}])
    .exec(function(err, relation){
        if(err){
            res.render('error', {message: err, error: err});
        }
        else{
            Tweet.find()
            .or([{creator: { $in : relation.following }}, {creator: req.session._id}])//get followers & my tweets
            .populate('creator', 'username')//put in the usernames to the tweets
            .sort({date: -1}) //sort them descending order
            .exec(function(err, tweets){
                if(err){
                    res.render('error', {message: err, error: err});
                }
                else{
                    User.find()
                    // .where()
                    .and([{_id: { $nin: relation.following } }, { username: {$ne: req.session.user }}])
                    .exec(function(err, nons){
                        if(err){
                            res.render('error', {message: err, error: err});
                        }
                        else{
                            res.render('home', {
                                "title": "Home",
                                "name": req.session.user,
                                "tweets": tweets,
                                "nonlist": nons,
                                "followers": relation.followers,
                                "following": relation.following
                            });
                        }//closes last else
                    });
                }//closes second else
            });
        }//closes the else of the top method
    });
});

module.exports = router;