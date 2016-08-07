'use strict';

var _ = require('underscore');
var assert = require('assert');
var request = require('supertest');
var app = require('../../api/app');

describe('/users', function() {
  describe('get', function() {
    it('should succeed to get users list', function(done) {
      request(app)
      .get('/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });

  describe('post', function() {
    it('should succeed to create user', function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ name: 'post' })
      .expect('Content-Type', /json/)
      .expect(201, done);
    });

    it('should fail to create user with invalid schema', function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ invald: 'post' })
      .expect(400, done);
    });

    it('should fail to create user with invalid schema type', function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ name: 1 })
      .expect(422, done);
    });
  });

  describe('put', function() {
    var insertedResUri;
    before(function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ name: 'post' })
      .end(function(err, res) {
        assert.equal(_.isError(err), false);
        insertedResUri = '/v1' + res.header.location;
        done();
      });
    });

    it('should succeed to update user', function(done) {
      request(app)
      .put(insertedResUri)
      .set('Accept', 'application/json')
      .send({ name: 'put' })
      .expect('Content-Type', /json/)
      .expect(205, done);
    });

    it('should fail to update user with invalid schema (struct)', function(done) {
      request(app)
      .put(insertedResUri)
      .set('Accept', 'application/json')
      .send({ invalid: 'put' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should fail to update user with invalid schema (type)', function(done) {
      request(app)
      .put(insertedResUri)
      .set('Accept', 'application/json')
      .send({ name: 1 })
      .expect('Content-Type', /json/)
      .expect(422, done);
    });

    it('should fail to update user if not exist user id', function(done) {
      request(app)
      .put('/v1/users/0')
      .set('Accept', 'application/json')
      .send({ name: 'put' })
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    it('should fail to update user with invalid user id', function(done) {
      request(app)
      .put('/v1/users/' + 'invalidId')
      .set('Accept', 'application/json')
      .send({ name: 'name' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });
  });

  describe('delete', function() {
    it('should succeed to delete user', function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ name: 'post' })
      .end(function(err, res) {
        assert.equal(_.isError(err), false);

        request(app)
        .delete('/v1' + res.header.location)
        .expect(204, done);
      });
    });

    it('should fail to delete user if not exist user id', function(done) {
      request(app)
      .delete('/v1/users/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    it('should fail to delete user with invalid user id', function(done) {
      request(app)
      .delete('/v1/users/' + 'invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
    });
  });
});
