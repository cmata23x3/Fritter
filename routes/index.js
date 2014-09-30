var express = require('express');
var router = express.Router();
var passport = require('passport');

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

module.exports = router;
