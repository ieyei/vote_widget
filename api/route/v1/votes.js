'use strict';

var express = require('express');
var router = express.Router();
var Movie = require('../../../core/models/movie');
var User = require('../../../core/models/user');

router.get('/votes', function(req, res, next) {
  return Movie.findCandidateMovies()
  .then(function(result) {
    res.json(result);
  }).catch(function(error) {
    next(error);
  });
});

router.put('/votes', function(req, res, next) {
  return User.saveFavoriteMovie(req.body.user_id, req.body.movie_id)
  .then(function(result) {
    res.json(result);
  }).catch(function(error) {
    next(error);
  });
});

module.exports = router;
