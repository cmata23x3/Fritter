var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Fritter' });
});

router.get('/login', function(req, res){
	res.render('./partials/form', {
		title: "Login",
		action: "/login",
		fields: [
		{name:'username', type:String, property:'required'},
		{name:'password', type:String, property:'required'}
		]
	});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var collection = req.db.collection('usercollection');
    collection.find({},{},function(e,docs){
        console.log("in the callback");
        res.render('userlist', {
            "title": "Users List",
            "userlist" : docs
        });
    });
});

module.exports = router;
