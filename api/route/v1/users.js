'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../../core/models/user');

router.get('/users', function(req, res) {
  return User.findAll()
  .then(function(result) {
    res.json(result);
  });
});

router.post('/users', function(req, res) {
  return User.insert(req.body)
  .then(function(result) {
    res.json({ insertId: result.insertId });
  });
});

router.get('/users/:id', function(req, res) {
  return User.findById(req.params.id)
  .then(function(result) {
    res.json(result[0]);
  });
});

router.put('/users/:id', function(req, res) {
  return User.updateById(req.params.id, req.body)
  .then(function(result) {
    res.json(result);
  });
});

router.delete('/users/:id', function(req, res) {
  return User.deleteById(req.params.id)
  .then(function(result) {
    res.json(result);
  });
});

module.exports = router;
