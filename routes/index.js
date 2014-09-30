var express = require('express');
var router = express.Router();

//mongoose
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, required:true, unique:true}, 
    name: String,
    password: String
});

var User = mongoose.model('User', UserSchema);
//done

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Fritter' });
});

/* GET login page*/
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
    collection.find({},{},function(err,docs){
        console.log(docs.toArray());
        res.render('userlist', {
            "title": "Users List",
            "userlist" : docs.toArray()
        });
    });
});

router.post('/new', function(req, res){
    console.log(User);
    var use = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    })
    console.log(use);
    use.save(function(err, doc){
        if(err){
            res.json(err);
        }
        else{    
            res.send('Successfully Inserted');
        }
    });
});

module.exports = router;
