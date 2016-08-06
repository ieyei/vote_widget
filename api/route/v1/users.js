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

router.post('/users', function(req, res, next) {
  return User.insert(req.body)
  .then(function(result) {
    res.json({ insertId: result.insertId });
  }).catch(function(error) {
    next(error);
  });
});

router.get('/users/:id', function(req, res, next) {
  return User.findById(req.params.id)
  .then(function(result) {
    res.json(result);
  }).catch(function(error) {
    next(error);
  });
});

router.put('/users/:id', function(req, res, next) {
  return User.updateById(req.params.id, req.body)
  .then(function(result) {
    res.json(result);
  }).catch(function(error) {
    next(error);
  });
});

router.delete('/users/:id', function(req, res, next) {
  return User.deleteById(req.params.id)
  .then(function(result) {
    res.json(result);
  }).catch(function(error) {
    next(error);
  });
});

module.exports = router;
