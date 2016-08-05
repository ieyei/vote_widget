'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/v1', require('./route/v1/movies'));
app.use('/v1', require('./route/v1/users'));
app.use('/v1', require('./route/v1/votes'));

module.exports = app;
