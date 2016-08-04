'use strict';

var express = require('express');
var router = express.Router();

router.get('/users', function(req, res) {
  res.json({ test: 'users' });
});

module.exports = router;
