#!/usr/bin/env node

var _ = require('underscore');
var Promise = require('bluebird');
var db = require('../core/common/db');

function generateSqlForMovie(dummyCount) {
  var baseMovieSql = 'INSERT INTO `movie` (`title`,`director_name`, `summary`) VALUES ';
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

  return baseMovieSql;
}

function generateSqlForUser(dummyCount) {
  var baseUserSql = 'INSERT INTO `user` (`name`) VALUES ';
  _.times(dummyCount, function(n) {
    baseUserSql += '(' +
    '"유저' + (n + 1) + '"';

    if (n !== dummyCount - 1) {
      baseUserSql += '), ';
    } else {
      baseUserSql += ');';
    }
  });

  return baseUserSql;
}

function execute(countForMovie, countForUser) {
  var movieSql = generateSqlForMovie(countForMovie);
  var userSql = generateSqlForUser(countForUser);

  return Promise.using(db(), function(connection) {
    return Promise.all([
      connection.queryAsync(movieSql),
      connection.queryAsync(userSql)
    ]);
  }).then(function() {
    return { movie: countForMovie, user: countForUser};
  });
}

exports.execute = execute;

(function () {
  if (require.main === module) {
    return execute(process.env.MOVIE_COUNT || 3, process.env.USER_COUNT || 3)
    .then(function(result) {
      console.log('insert %d Movie, %d User data complete', result.movie, result.user);
      return 0;
    }).catch(function(err) {
      console.error(err);
      console.error(err.stack);
      return -1;
    }).then(function(exitCode) {
      process.exit(exitCode);
      return;
    });
  }
})();
