'use strict';

var _ = require('underscore');
var Promise = require('bluebird');
var db = require('../common/db');

function validate(value) {
  return Promise.try(function() {
    var requireField = [ 'name' ];
    _.each(requireField, function(fieldName) {
      if (!_.has(value, fieldName)) {
        throw new Error('Invalid user schema');
      }
    });

    if (_.has(value, 'movie_id')) {
      if (!_.isNumber(value.movie_id)) {
        throw new Error('Invalid user schema');
      }
    }

    if (!_.isString(value.name)) {
      throw new Error('Invalid user schema');
    }

    return _.pick(value, 'name', 'movie_id');
  });
}

exports.findAll = function () {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM user');
  }).catch(function(error) {
    console.error(error);
  });
};

exports.findById = function (id) {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('SELECT * FROM user WHERE id=?', [id]);
  }).catch(function(error) {
    console.error(error);
  });
};

exports.insert = function (user) {
  return validate(user)
  .then(function(validatedUser) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('INSERT INTO user SET ?', validatedUser);
    }).catch(function(error) {
      console.error(error);
    });
  });
};

exports.updateById = function (id, user) {
  return validate(user)
  .then(function(validatedUser) {
    return Promise.using(db(), function(connection) {
      return connection.queryAsync('UPDATE user SET ? WHERE id=?', [validatedUser, id]);
    }).catch(function(error) {
      console.error(error);
    });
  });
};

exports.deleteById = function(id) {
  return Promise.using(db(), function(connection) {
    return connection.queryAsync('DELETE FROM user WHERE id=?', [id]);
  }).catch(function(error) {
    console.error(error);
  });
};
