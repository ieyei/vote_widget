'use strict';

var _ = require('underscore');
var Promise = require('bluebird');
var db = require('../common/db');
var ec = require('../common/errorCode');

function validate(value) {
  return Promise.try(function() {
    var requireField = [ 'name' ];
    _.each(requireField, function(fieldName) {
      if (!_.has(value, fieldName)) {
        throw ec.BadRequest('Invalid user schema');
      }
    });

    if (_.has(value, 'movie_id')) {
      if (!_.isNumber(value.movie_id)) {
        throw ec.UnprocessableEntity('Invalid user schema');
      }
    }

    if (!_.isString(value.name)) {
      throw ec.UnprocessableEntity('Invalid user schema');
    }

    return _.pick(value, 'name', 'movie_id');
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
    return connection.queryAsync('SELECT * FROM user');
  });
};

exports.findById = function (id) {
  return validateIdType(id)
  .then(function(parsedId) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('SELECT * FROM user WHERE id=?', [parsedId])
      .then(function(result) {
        if (_.isEmpty(result)) {
          throw ec.NotFound();
        }

        return result[0];
      });
    });
  });
};

exports.insert = function (user) {
  return validate(user)
  .then(function(validatedUser) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('INSERT INTO user SET ?', validatedUser);
    });
  });
};

exports.updateById = function (id, user) {
  return validateIdType(id)
  .then(function(parsedId) {
    return validate(user)
    .then(function(validatedUser) {
      return Promise.using(db(), function(connection) {
        return connection.queryAsync('UPDATE user SET ? WHERE id=?', [validatedUser, parsedId])
        .then(function(result) {
          if (result.changedRows === 0) {
            throw ec.NotFound();
          }

          return _.extend({ id: parsedId }, validatedUser);
        });
      });
    });
  });
};

exports.deleteById = function(id) {
  return validateIdType(id)
  .then(function(parsedId) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('DELETE FROM user WHERE id=?', [parsedId])
      .then(function(result) {
        if (result.affectedRows === 0) {
          throw ec.NotFound();
        }

        return { deletedId: parsedId };
      });
    });
  });
};

exports.saveFavoriteMovie = function (userId, movieId) {
  return Promise.props({
    userId: validateIdType(userId),
    movieId: validateIdType(movieId)
  }).then(function(parsed) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('UPDATE user SET movie_id=? WHERE id=?', [
        parsed.movieId, parsed.userId
      ])
      .then(function(result) {
        if (result.changedRows === 0) {
          throw ec.BadRequest('invalid user id');
        }

        return { user_id: parsed.userId, movie_id: parsed.movieId };
      })
      .catch(function(error) {
        throw ec.BadRequest(error.message);
      });
    });
  });
};
