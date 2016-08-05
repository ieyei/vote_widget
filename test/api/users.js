'use strict';

var _ = require('underscore');
var request = require('supertest');
var app = require('../../api/app');

describe('users', function() {
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
      .expect(function(res) {
        if (!_.has(res.body, 'insertId') || !_.isNumber(res.body.insertId)) {
          throw new Error('Missing insertId');
        }
      })
      .expect(200, done);
    });

    it('should fail to create user with invalid schema', function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ invald: 'post' })
      .expect(400, done);
    });
  });

  describe('put', function() {
    var id;
    before(function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ name: 'post' })
      .end(function(err, res) {
        if (err) {
          throw new Error('Fail user post');
        }

        id = res.body.insertId;
        done();
      });
    });

    it('should succeed to update user', function(done) {
      request(app)
      .put('/v1/users/' + id)
      .set('Accept', 'application/json')
      .send({ name: 'put' })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should fail to update user with invalid schema', function(done) {
      request(app)
      .put('/v1/users/' + id)
      .set('Accept', 'application/json')
      .send({ invalid: 'put' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should fail to update user if not exist user id', function(done) {
      request(app)
      .put('/v1/users/' + 'invalidId')
      .set('Accept', 'application/json')
      .send({ name: 'put' })
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });

  describe('delete', function() {
    it('should succeed to delete user', function(done) {
      request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .send({ name: 'post' })
      .end(function(err, res) {
        if (err) {
          throw new Error('Fail user post');
        }

        request(app)
        .delete('/v1/users/' + res.body.insertId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });

    it('should fail to delete user if not exist user id', function(done) {
      request(app)
      .delete('/v1/users/' + 'invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });
});
