'use strict';

var _ = require('underscore');
var assert = require('assert');
var databaseUtil = require('../common/databaseUtil');
var Movie = require('../../core/models/movie');

describe('Movie', function() {
  before(function(done) {
    databaseUtil.initializeForTest(100, 100, done);
  });

  describe('findAll', function() {
    it('should succeed to get movie list', function(done) {
      Movie.findAll()
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), true);
        assert.equal(result.length, 100);
        done();
      });
    });
  });

  describe('findById', function() {
    it('should succeed to get a single movie by id', function(done) {
      Movie.findById(50)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.id, 50);
        done();
      });
    });

    it('should fail to get a single movie if non-exist id', function(done) {
      Movie.findById(999)
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
      Movie.updateById(50, { title: 'title', director_name: 'director_name', summary: 'summary' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.id, 50);
        assert.equal(result.title, 'title');
        assert.equal(result.director_name, 'director_name');
        assert.equal(result.summary, 'summary');
        done();
      });
    });

    it('should fail to update by id with invalid object', function(done) {
      Movie.updateById(50, { invalid: 'invalid' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Invalid movie schema');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });

    it('should fail to update by id if non-exist id', function(done) {
      Movie.updateById(999, { title: 'title', director_name: 'director_name', summary: 'summary' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Not Found');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });

  describe('findCandidateMovies', function() {
    it('should succeed to get three random movie', function(done) {
      Movie.findCandidateMovies()
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), true);
        assert.equal(result.length, 3);
        done();
      });
    });
  });

  describe('insert', function() {
    it('should succeed to insert movie', function(done) {
      Movie.insert({ title: 'title', director_name: 'director_name', summary: 'summary' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.insertId, 101);
        done();
      });
    });

    it('should fail to insert movie with invalid object', function(done) {
      Movie.insert({ invalid: 'invalid' })
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Invalid movie schema');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });

  describe('deleteById', function() {
    it('should succeed to delete movie', function(done) {
      Movie.deleteById(1)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), false);
        assert.equal(_.isArray(result), false);
        assert.equal(result.deletedId, 1);
        done();
      });
    });

    it('should fail to delete movie if non-exist id', function(done) {
      Movie.deleteById(999)
      .asCallback(function(err, result) {
        assert.equal(_.isError(err), true);
        assert.equal(err.message, 'Not Found');
        assert.equal(_.isEmpty(result), true);
        done();
      });
    });
  });
});
