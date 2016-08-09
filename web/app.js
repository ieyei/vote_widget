'use strict';

var _ = require('underscore');
var express = require('express');
var app = express();

function setFallback(index) {
  var reactRouterPath = [ '/home', '/votes' ];
  _.each(reactRouterPath, function(path) {
    app.get(path, function (req, res, next) {
      if (req.accepts('html')) {
        res.sendFile(__dirname + '/' + index);
      } else {
        next();
      }
    });
  });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist'));
  setFallback('dist/index.html');
} else {
  app.use(express.static(__dirname + '/dev/html'));
  app.use('/img', express.static(__dirname + '/dev/img'));
  app.use('/css', express.static(__dirname + '/build/css'));
  app.use('/js', express.static(__dirname + '/build/js'));
  app.use('/vendor', express.static(__dirname + '/dist/vendor'));
  setFallback('dev/html/index.html');
}

module.exports = app;
