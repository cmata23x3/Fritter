var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/db', function(req, res) {
    var mongojs = require('mongojs');
    var dbName = "/fritter";
    var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;
    var db = mongojs(connection_string, ['scores']);
    // console.log(db);
    var books = db.collection('scores');
	// console.log(books);
    db.scores.find(function(err, docs) {
       res.send(docs); 
    });
});

module.exports = router;
