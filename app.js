var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./data/models/users.js');

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
// db.once('once', function callback(){
//   console.log('Connected to DB');
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.session({
//   secret: 'secret',
//   maxAge: 3600000
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    User.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }
 
      if (!user) {
        return done(null, false);
      }
 
      if (user.password != password) {
        return done(null, false);
      }
 
      return done(null, user);
    });
  });
}));

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