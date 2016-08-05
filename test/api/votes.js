'use strict';

var request = require('supertest');
var app = require('../../api/app');

describe('votes', function() {
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
    var movieId, userId;
    before(function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 'vote', director_name: 'vote', summary: 'vote' })
      .end(function(err, res) {
        if (err) {
          throw new Error('Fail movie post');
        }

        movieId = res.body.insertId;
        request(app)
        .post('/v1/users')
        .set('Accept', 'application/json')
        .send({ name: 'vote' })
        .end(function(err, res) {
          if (err) {
            throw new Error('Fail user post');
          }

          userId = res.body.insertId;
          done();
        });
      });
    });

    it('should succeed to vote', function(done) {
      request(app)
      .put('/v1/votes')
      .set('Accept', 'application/json')
      .send({ user_id: userId, movie_id: movieId })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should fail to vote if not exist movie id', function(done) {
      request(app)
      .put('/v1/votes')
      .set('Accept', 'application/json')
      .send({ user_id: userId, movie_id: 'invalidId' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should fail to vote if not exist user id', function(done) {
      request(app)
      .put('/v1/votes')
      .set('Accept', 'application/json')
      .send({ user_id: 'invalidId', movie_id: movieId })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });
  });
});
