'use strict';

var _ = require('underscore');
var assert = require('assert');
var request = require('supertest');
var app = require('../../api/app');

describe('/movies', function() {
  describe('get', function() {
    it('should succeed to get movies list', function(done) {
      request(app)
      .get('/v1/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  describe('post', function() {
    it('should succeed to create movie', function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 'post', director_name: 'post', summary: 'post' })
      .expect('Content-Type', /json/)
      .expect(201, done);
    });

    it('should fail to create movie with invalid schema', function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ invald: 'post' })
      .expect(400, done);
    });

    it('should fail to create movie with invalid schema type', function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 1, director_name: 1, summary: 1 })
      .expect(422, done);
    });
  });

  describe('put', function() {
    var insertedResUri;
    before(function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 'post', director_name: 'post', summary: 'post' })
      .end(function(err, res) {
        assert.equal(_.isError(err), false);
        insertedResUri = '/v1' + res.header.location;
        done();
      });
    });

    it('should succeed to update movie', function(done) {
      request(app)
      .put(insertedResUri)
      .set('Accept', 'application/json')
      .send({ title: 'put', director_name: 'put', summary: 'put' })
      .expect('Content-Type', /json/)
      .expect(205, done);
    });

    it('should fail to update movie with invalid schema (struct)', function(done) {
      request(app)
      .put(insertedResUri)
      .set('Accept', 'application/json')
      .send({ invalid: 'put' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should fail to update movie with invalid schema (type)', function(done) {
      request(app)
      .put(insertedResUri)
      .set('Accept', 'application/json')
      .send({ title: 1, director_name: 1, summary: 1 })
      .expect('Content-Type', /json/)
      .expect(422, done);
    });

    it('should fail to update movie if not exist movie id', function(done) {
      request(app)
      .put('/v1/movies/0')
      .set('Accept', 'application/json')
      .send({ title: 'put', director_name: 'put', summary: 'put' })
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    it('should fail to update movie with invalid movie id', function(done) {
      request(app)
      .put('/v1/movies/' + 'invalidId')
      .set('Accept', 'application/json')
      .send({ title: 'put', director_name: 'put', summary: 'put' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });
  });

  describe('delete', function() {
    it('should succeed to delete movie', function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 'post', director_name: 'post', summary: 'post' })
      .end(function(err, res) {
        assert.equal(_.isError(err), false);

        request(app)
        .delete('/v1' + res.header.location)
        .expect(204, done);
      });
    });

    it('should fail to delete movie if not exist movie id', function(done) {
      request(app)
      .delete('/v1/movies/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    it('should fail to delete movie with invalid movie id', function(done) {
      request(app)
      .delete('/v1/movies/' + 'invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
    });
  });
});
