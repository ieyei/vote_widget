'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var ec = require('../core/common/errorCode');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/v1', require('./route/v1/movies'));
app.use('/v1', require('./route/v1/users'));
app.use('/v1', require('./route/v1/votes'));

app.use(function(req, res, next) {
  next(ec.NotFound());
});

app.use(function(err, req, res, next) {
  var isTest = /node-superagent/.test(req.headers['user-agent']);

  if (err !== 404 && !isTest) {
    console.error('response error with ', { err: err });
    console.error(err.stack);
  }

  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
  next();
});

module.exports = app;
