'use strict';

var _ = require('underscore');
var Promise = require('bluebird');
var db = require('../common/db');
var ec = require('../common/errorCode');

function validate(value) {
  return Promise.try(function() {
    var requireField = [ 'title', 'director_name', 'summary' ];
    _.each(requireField, function(fieldName) {
      if (!_.has(value, fieldName)) {
        throw ec.BadRequest('Invalid movie schema');
      }

      if (!_.isString(value[fieldName])) {
        throw ec.BadRequest('Invalid movie schema');
      }
    });

    return _.pick(value, requireField);
  });
}

exports.findAll = function () {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM movie');
  });
};

exports.findById = function (id) {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM movie WHERE id=?', [id])
    .then(function(result) {
      if (_.isEmpty(result)) {
        throw ec.NotFound();
      }

      return result;
    });
  });
};

exports.insert = function (movie) {
  return validate(movie)
  .then(function(validatedMovie) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('INSERT INTO movie SET ?', validatedMovie);
    });
  });
};

exports.updateById = function (id, movie) {
  return validate(movie)
  .then(function(validatedMovie) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('UPDATE movie SET ? WHERE id=?', [validatedMovie, id])
      .then(function(result) {
        if (result.changedRows === 0) {
          throw ec.NotFound();
        }

        return _.extend({ id: id }, validatedMovie);
      });
    });
  });
};

exports.deleteById = function(id) {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('DELETE FROM movie WHERE id=?', [id])
    .then(function(result) {
      if (result.affectedRows === 0) {
        throw ec.NotFound();
      }

      return { deletedId: id };
    });
  });
};
