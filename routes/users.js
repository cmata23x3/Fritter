var express = require('express');
var router = express.Router();
var User = require('../data/models/users.js');
var Relation = require('../data/models/relations.js');
var Auth = require('../util/auth.js');

/* POST new User data */
router.post('/new', Auth.isNotAuthenticated, function(req, res){
    var use = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    }).save(function(err, newUser){
        if(err){
            console.log("error on new user creation: ", err);
            res.redirect('../login');
        }
        else{
            req.session.user = newUser.username;
            req.session._id = newUser._id
            var relation = new Relation({
                user: newUser._id
            }).save(function(err, doc){
                res.redirect('../home');
            });    
        }
    });
});

/* POST new Follower data */
router.post('/follow', Auth.isAuthenticated, function(req, res){
    Relation.findOneAndUpdate({"user": req.session._id}, {$push: {following: req.body.id}}).exec(function(err, doc){
        if(err){
            console.log("fuckk!!!!!", err);
        }
        else{
            Relation.findOneAndUpdate({"user": req.body.id}, {$push: {followers: req.session._id}}).exec(function(err, docs){
                if(err){
                    res.render('error', {message: err, error: err});
                }
                else{
                    res.redirect('../home');
                }
            });
        }
    });
});

/* POST unfollow change data */
router.post('/unfollow', Auth.isAuthenticated, function(req, res){
    //remove person from my following list
    Relation.findOneAndUpdate({"user": req.session._id}, {$pull: {following: req.body.id}}).exec(function(err, doc){
        if(err){
            res.render('error', {message: err, error: err});
        }
        else{
            //remove me from their followers list
            Relation.findOneAndUpdate({"user": req.body.id}, {$pull: {followers: req.session._id}}).exec(function(err, docs){
                if(err){
                    res.render('error', {message: err, error: err});
                }
                else{
                    res.redirect('../home');
                }
            });
        }
    });
});

module.exports = router;