'use strict';

var express = require('express');
var router = express.Router();

router.get('/movies', function(req, res) {
  res.json({ test: 'movies' })
});

module.exports = router;
