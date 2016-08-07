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
        throw ec.UnprocessableEntity('Invalid movie schema');
      }
    });

    return _.pick(value, requireField);
  });
}

function validateIdType(id) {
  return Promise.try(function() {
    var parsed = parseInt(id);
    if (_.isNaN(parsed)) {
      throw ec.BadRequest('Invalid movie id');
    }

    return parsed;
  });
}

exports.findAll = function () {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM movie');
  });
};

exports.findById = function (id) {
  return validateIdType(id)
  .then(function(parsedId) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('SELECT * FROM movie WHERE id=?', [parsedId])
      .then(function(result) {
        if (_.isEmpty(result)) {
          throw ec.NotFound();
        }

        return result[0];
      });
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
  return validateIdType(id)
  .then(function(parsedId) {
    return validate(movie)
    .then(function(validatedMovie) {
      return Promise.using(db(), function(connection) {
        return connection.queryAsync('UPDATE movie SET ? WHERE id=?', [validatedMovie, parsedId])
        .then(function(result) {
          if (result.changedRows === 0) {
            throw ec.NotFound();
          }

          return _.extend({ id: parsedId }, validatedMovie);
        });
      });
    });
  });
};

exports.deleteById = function(id) {
  return validateIdType(id)
  .then(function(parsedId) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('DELETE FROM movie WHERE id=?', [parsedId])
      .then(function(result) {
        if (result.affectedRows === 0) {
          throw ec.NotFound();
        }

        return { deletedId: parsedId };
      });
    });
  });
};

exports.findCandidateMovies = function() {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT COUNT(id) AS count FROM movie')
    .then(function(totalCount) {
      var selectedOffsets = _.sample(_.range(totalCount[0].count), 3);
      var promises = _.map(selectedOffsets, function(offset) {
        return connection.queryAsync('SELECT * FROM movie LIMIT 1 OFFSET ?', [offset]);
      });
      return Promise.all(promises)
      .then(function(result) {
        return _.flatten(result);
      });
    });
  });
};
