'use strict';

var _ = require('underscore');
var assert = require('assert');
var databaseUtil = require('../common/databaseUtil');
var User = require('../../core/models/user');

describe('User', function() {
  before(function(done) {
    databaseUtil.initializeForTest(100, 100, done);
  });

  describe('findAll', function() {
    it('should succeed to get user list', function(done) {
      User.findAll()
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), true);
        assert.equal(result.length, 100);
        done();
      });
    });
  });

  describe('findById', function() {
    it('should succeed to get a single user by id', function(done) {
      User.findById(50)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.id, 50);
        done();
      });
    });

    it('should fail to get a single user if non-exist id', function(done) {
      User.findById(999)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Not Found');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });

  describe('updateById', function() {
    it('should succeed to update by id', function(done) {
      User.updateById(50, { name: 'name' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.id, 50);
        assert.equal(result.name, 'name');
        done();
      });
    });

    it('should fail to update by id with invalid object', function(done) {
      User.updateById(50, { invalid: 'invalid' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Invalid user schema');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });

    it('should fail to update by id if non-exist id', function(done) {
      User.updateById(999, { name: 'name' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Not Found');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });

  describe('insert', function() {
    it('should succeed to insert user', function(done) {
      User.insert({ name: 'name' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.insertId, 101);
        done();
      });
    });

    it('should fail to insert user with invalid object', function(done) {
      User.insert({ invalid: 'invalid' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Invalid user schema');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });

  describe('deleteById', function() {
    it('should succeed to delete user', function(done) {
      User.deleteById(1)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.deletedId, 1);
        done();
      });
    });

    it('should fail to delete user if non-exist id', function(done) {
      User.deleteById(999)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Not Found');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });

  describe('saveFavoriteMovie', function() {
    it('should succeed to save favorite movie', function(done) {
      User.saveFavoriteMovie(100, 100)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.user_id, 100);
        assert.equal(result.movie_id, 100);
        done();
      });
    });
  });
});
