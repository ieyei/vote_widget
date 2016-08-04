'use strict';

var express = require('express');
var router = express.Router();

router.get('/votes', function(req, res) {
  res.json({ test: 'votes' });
});

module.exports = router;
