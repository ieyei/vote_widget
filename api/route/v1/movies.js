'use strict';

var express = require('express');
var router = express.Router();
var Movie = require('../../../core/models/movie');

router.get('/movies', function(req, res) {
  return Movie.findAll()
  .then(function(result) {
    res.json(result);
  });
});

router.post('/movies', function(req, res, next) {
  return Movie.insert(req.body)
  .then(function(result) {
    res.location('/movies/' + result.insertId);
    res.status(201).json();
  }).catch(function(error) {
    next(error);
  });
});

router.get('/movies/:id', function(req, res, next) {
  return Movie.findById(req.params.id)
  .then(function(result) {
    res.json(result);
  }).catch(function(error) {
    next(error);
  });
});

router.put('/movies/:id', function(req, res, next) {
  return Movie.updateById(req.params.id, req.body)
  .then(function() {
    res.status(205).json();
  }).catch(function(error) {
    next(error);
  });
});

router.delete('/movies/:id', function(req, res, next) {
  return Movie.deleteById(req.params.id)
  .then(function() {
    res.status(204).json();
  }).catch(function(error) {
    next(error);
  });
});

module.exports = router;
