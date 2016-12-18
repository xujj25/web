var express = require('express');
var path = require('path');
var favicon = require('express-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var login = require('./routes/login');
var regist = require('./routes/regist');
var loginPost = require('./routes/loginPost');
var registPost = require('./routes/registPost');
// var connect = require('./routes/connect');
// var insert = require('./routes/insert');
var mongoose = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname	, 'public')));

app.use('/', login);
app.use('/regist', regist);
app.use('/loginPost', loginPost);
app.use('/registPost', registPost);
// app.use('/connect', connect);
// app.use('/insert', insert);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// add the following code from Internet
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });


var server = app.listen(3000, function () {
  //connect db
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
