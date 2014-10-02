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

/* GET Userlist page. */
router.get('/list', function(req, res) {
    // var collection = req.db.collection('usercollection');
    User.find({},function(err,docs){
        if(err){
            res.json(err);
        }
        else{
            res.render('userlist', {
            "title": "Users List",
            "userlist" : docs
            });
        }
    });
});

module.exports = router;