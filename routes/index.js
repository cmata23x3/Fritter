var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../data/models/users.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Fritter' });
});

/* GET login page*/
router.get('/login', function(req, res){
    res.render('login', {title: 'Log In'});
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);
 
router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
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

/* GET View Data */
router.get('/view', function(req, res){
    User.find({}, function(err, docs){
        if(err) res.json(err);
        else    res.render('/')
    })
})

/* POST new User data */
router.post('/new', function(req, res){
    var use = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    }).save(function(err, doc){
        if(err){
            res.json(err);
        }
        else{    
            res.send('Successfully Inserted');
            // res.redirect('/userlist');
        }
    });
});

module.exports = router;
