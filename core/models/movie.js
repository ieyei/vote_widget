'use strict';

var _ = require('underscore');
var Promise = require('bluebird');
var db = require('../common/db');

function validate(value) {
  return Promise.try(function() {
    var requireField = [ 'title', 'director_name', 'summary' ];
    _.each(requireField, function(fieldName) {
      if (!_.has(value, fieldName)) {
        throw new Error('Invalid movie schema');
      }

      if (!_.isString(value[fieldName])) {
        throw new Error('Invalid movie schema');
      }
    });

    return _.pick(value, requireField);
  });
}

exports.findAll = function () {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM movie');
  }).catch(function(error) {
    console.error(error);
  });
};

exports.findById = function (id) {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM movie WHERE id=?', [id]);
  }).catch(function(error) {
    console.error(error);
  });
};

exports.insert = function (movie) {
  return validate(movie)
  .then(function(validatedMovie) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('INSERT INTO movie SET ?', validatedMovie);
    }).catch(function(error) {
      console.error(error);
    });
  });
};

exports.updateById = function (id, movie) {
  return validate(movie)
  .then(function(validatedMovie) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('UPDATE movie SET ? WHERE id=?', [validatedMovie, id]);
    }).catch(function(error) {
      console.error(error);
    });
  });
};

exports.deleteById = function(id) {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('DELETE FROM movie WHERE id=?', [id]);
  }).catch(function(error) {
    console.error(error);
  });
};
