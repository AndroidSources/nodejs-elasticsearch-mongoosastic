var express = require('express');
var path = require('path');
var morgon = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/main');
var User = require('./app/models/user');
var Brands = require('./app/models/brands');
var routes = require('./routes/routes');
var jwt = require('jsonwebtoken');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//middleware is gettting executed and the request incoming is logged
app.use(morgon('dev'));
//parsing the body which comes in the request as a json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//used for reading cookies from request like header,x-auth-token etc
app.use(cookieParser());
//used for serving static file..like style.css under the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// Bring in defined Passport Strategy
require('./config/passport')(passport);


// Set url for API group routes
app.use('/api', routes);


Brands.createMapping(function (err, mapping) {
    if (err) {
        console.log(err);
    } else {
        console.log("Mapping created");
        console.log("Mapping created " + mapping);

    }
});


var stream = Brands.synchronize();
var count=0;

stream.on('data', function () {
    count++;
});
stream.on('close', function () {
    console.log("indexed "+count);
});
stream.on('error', function (err) {
   console.log(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
