'use strict';

var request = require('supertest');
var app = require('../../api/app');
var databaseUtil = require('../common/databaseUtil');

describe('/votes', function() {
  before(function(done) {
    databaseUtil.initializeForTest(100, 100, done);
  });

  describe('get', function() {
    it('should succeed to get three random movie list for vote', function(done) {
      request(app)
      .get('/v1/votes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (res.body.length !== 3) {
          throw new Error('movies length must be 3');
        }
      })
      .expect(200, done);
    });
  });

  describe('put', function() {
    it('should succeed to vote', function(done) {
      request(app)
      .put('/v1/votes')
      .set('Accept', 'application/json')
      .send({ user_id: 1, movie_id: 1 })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should fail to vote if not exist movie id', function(done) {
      request(app)
      .put('/v1/votes')
      .set('Accept', 'application/json')
      .send({ user_id: 2, movie_id: 'invalidId' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should fail to vote if not exist user id', function(done) {
      request(app)
      .put('/v1/votes')
      .set('Accept', 'application/json')
      .send({ user_id: 'invalidId', movie_id: 2 })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });
  });
});
