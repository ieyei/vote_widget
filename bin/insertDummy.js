#!/usr/bin/env node

var _ = require('underscore');
var Promise = require('bluebird');
var db = require('../core/common/db');

var baseMovieSql = 'INSERT INTO `movie` (`title`,`director_name`, `summary`) VALUES ';
var baseUserSql = 'INSERT INTO `user` (`name`) VALUES ';

var dummyCount = process.env.COUNT || 3;

_.times(dummyCount, function(n) {
  baseMovieSql += '(' +
  '"영화' + (n + 1) + '", ' +
  '"감독' + (n + 1) + '", ' +
  '"요약' + (n + 1) + '"';

  if (n !== dummyCount - 1) {
    baseMovieSql += '), ';
  } else {
    baseMovieSql += ');';
  }
});

_.times(dummyCount, function(n) {
  baseUserSql += '(' +
  '"유저' + (n + 1) + '"';

  if (n !== dummyCount - 1) {
    baseUserSql += '), ';
  } else {
    baseUserSql += ');';
  }
});

Promise.using(db(), function(connection) {
  return Promise.all([
    connection.queryAsync(baseMovieSql),
    connection.queryAsync(baseUserSql)
  ]).then(function() {
    console.log('insert %d dummy data complete', dummyCount);
    process.exit(0);
  });
}).catch(function(err) {
  console.error(err);
  process.exit(-1);
});
