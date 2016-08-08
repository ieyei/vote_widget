'use strict';

var _ = require('underscore');
var initializeDb = require('../../bin/initializeDb');
var insertDummy = require('../../bin/insertDummy');

exports.initializeForTest = function (movieCount, userCount, callback) {
  return initializeDb.execute()
  .then(_.partial(insertDummy.execute, movieCount, userCount))
  .asCallback(callback);
};
