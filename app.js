var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets')

var app = express();

var dbURL = 'mongodb://localhost/fritter';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
	dbURL = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PORT + '/fritter';
}
var mongoose = require('mongoose').connect(dbURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	app.use(session({ 
		store: new MongoStore({
			db: 'fritter',
			host: process.env.OPENSHIFT_MONGODB_DB_HOST,
			port: process.env.OPENSHIFT_MONGODB_DB_PORT
		}),
		resave: true,
		saveUninitialized: true,
		secret: '$ecRe7' 
	}));
}
else{
	app.use(session({ 
	resave: true,
	saveUninitialized: true,
	secret: '$ecRe7' 
}));
}
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/tweets', tweets)

app.use(function(req, res, next){
	res.locals.session = req.session;
	next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

console.log('Its running on: ', (process.env.OPENSHIFT_NODEJS_PORT || 8080));
app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
	process.env.OPENSHIFT_NODEJS_IP);

module.exports = app;