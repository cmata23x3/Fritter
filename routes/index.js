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
            req.session.user = newUser.username;
            req.session._id = newUser._id
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

/*POST logiout info */
router.post('/logout', Auth.isAuthenticated, function(req, res){
	req.session.destroy();
	res.redirect('/');
});

/*GET home page */
// router.get('/home', Auth.isAuthenticated, function(req, res) {
// 	Tweet
//     .find({query: {}, $orderby: {date: -1}})
//     .populate('creator', 'username')
//     .exec(function(err, tweets){
//         if(err){
//         	console.log('Error in tweets');
//             res.json(err);
//         }
//         else{
//             User.find({})
//             // .populate([{path:'following', select:'name username'}, {path:'followers', select:'name username'}])
//             .exec(function(err, users){
//                 // var results = helper.modifyUsers(users, req.session.user);
//                 res.render('home', {
//                     "title": "Home",
//                     "name": req.session.user,
//                     "tweets": tweets,
//                     "nonlist": users,
//                     "followers": [],
//                     "following": []
//                 });
//             });
//         }
//     });
// });

router.get('/home', Auth.isAuthenticated, function(req, res){
    //Get followers & following
    Relation
    .findOne({user: req.session._id})
    .populate([{path:'following', select:'name username'}, {path:'followers', select:'name username'}])
    .exec(function(err, relation){
        if(err){
            console.log("fuck");
            res.render('error', {
                message: err,
                error: err
            });
        }
        else{
            Tweet.find()
            .or([{creator: { $in : relation.following }}, {creator: req.session._id}])//get followers & my tweets
            .populate('creator', 'username')//put in the usernames to the tweets
            .sort({date: -1}) //sort them descending order
            .exec(function(err, tweets){
                if(err){
                    console.log("fuck");
                    res.render('error', {
                        message: err,
                        error: err
                    });
                }
                else{
                    console.log("\n\nThis is tweets: ", tweets);
                    res.render('home', {
                        "title": "Home",
                        "name": req.session.user,
                        "tweets": tweets,
                        "nonlist": [],
                        "followers": relation.followers,
                        "following": relation.following
                    });
                }
            });
        }//closes the else of the top method
    });
});

// res.render('home', {
//     "title": "Home",
//     "user": req.session.user,
//     "name": req.session.user,
//     "tweets": tweets,
//     "nonlist": users,
//     "followers": [],
//     "following": []
// });

module.exports = router;