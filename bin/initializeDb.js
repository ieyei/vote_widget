#!/usr/bin/env node

var Promise = require('bluebird');
var db = require('../core/common/db');

var createMovieTableSql = 'CREATE TABLE IF NOT EXISTS `movie` ( ' +
  '`id` INT(10) NOT NULL AUTO_INCREMENT, ' +
  '`title` VARCHAR(50) NOT NULL, ' +
  '`director_name` VARCHAR(50) NOT NULL, ' +
  '`summary` TEXT NOT NULL, ' +
  'PRIMARY KEY (`id`) ' +
') ' +
'ENGINE = InnoDB ' +
'DEFAULT CHARACTER SET = utf8;';

var createUserTableSql = 'CREATE TABLE IF NOT EXISTS `user` ( ' +
  '`id` INT(10) NOT NULL AUTO_INCREMENT, ' +
  '`name` VARCHAR(50) NOT NULL, ' +
  '`movie_id` INT(10), ' +
  'PRIMARY KEY (`id`), ' +
  'INDEX (`movie_id`), ' +
  'FOREIGN KEY (`movie_id`) ' +
    'REFERENCES `movie` (`id`) ' +
    'ON DELETE SET NULL ' +
') ' +
'ENGINE = InnoDB ' +
'DEFAULT CHARACTER SET = utf8;';

Promise.using(db(), function(connection) {
  return Promise.all([
    connection.queryAsync('DROP TABLE IF EXISTS user'),
    connection.queryAsync('DROP TABLE IF EXISTS movie')
  ]).then(function() {
    return Promise.all([
      connection.queryAsync(createMovieTableSql),
      connection.queryAsync(createUserTableSql),
    ])
  }).then(function() {
    console.log('initialize database complete');
    process.exit(0);
  });
}).catch(function(err) {
  console.error(err);
  process.exit(-1);
});
