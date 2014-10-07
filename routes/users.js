var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Auth = require('../util/auth.js');

/* POST new User data */
router.post('/new', Auth.isNotAuthenticated, function(req, res){
    var use = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    }).save(function(err, doc){
        if(err){
            console.log("error on new user creation: ", err);
            res.redirect('../login');
        }
        else{    
            req.session.user = doc.username;
            res.redirect('../home');
        }
    });
});

/* POST new Follower data */
router.post('/follow', Auth.isAuthenticated, function(req, res){
    //make sure passes _id/username of desired freeterer
    User.findOne({username: req.session.user}, function(err, currentUser){ //find my info
        if(err){
            console.log('Error happened: ', err);
            res.redirect('../home');
        }
        else{
            User.findOne({_id: req.body.id}, function(err, followingUser){ //find their info
                if(followingUser){
                    //update the my info and their info
                    currentUser.update({$push: {following: followingUser._id}}).exec();
                    followingUser.update({$push: {followers: currentUser._id}}).exec(function(err, docs){
                        console.log('should be done adding users to following & followers');
                        res.redirect('../home');
                    });
                }
                else{
                    console.log('Error happened: ', err);
                    res.redirect('../home');
                }
            });
        }
    });
});

module.exports = router;