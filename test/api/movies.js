'use strict';

var _ = require('underscore');
var request = require('supertest');
var app = require('../../api/app');

describe('movies', function() {
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
      .expect(function(res) {
        if (!_.has(res.body, 'insertId') || !_.isNumber(res.body.insertId)) {
          throw new Error('Missing insertId');
        }
      })
      .expect(200, done);
    });

    it('should fail to create movie with invalid schema', function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ invald: 'post' })
      .expect(400, done);
    });
  });

  describe('put', function() {
    var id;
    before(function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 'post', director_name: 'post', summary: 'post' })
      .end(function(err, res) {
        if (err) {
          throw new Error('Fail movie post');
        }

        id = res.body.insertId;
        done();
      });
    });

    it('should succeed to update movie', function(done) {
      request(app)
      .put('/v1/movies/' + id)
      .set('Accept', 'application/json')
      .send({ title: 'put', director_name: 'put', summary: 'put' })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should fail to update movie with invalid schema', function(done) {
      request(app)
      .put('/v1/movies/' + id)
      .set('Accept', 'application/json')
      .send({ invalid: 'put' })
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should fail to update movie if not exist movie id', function(done) {
      request(app)
      .put('/v1/movies/' + 'invalidId')
      .set('Accept', 'application/json')
      .send({ title: 'put', director_name: 'put', summary: 'put' })
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });

  describe('delete', function() {
    it('should succeed to delete movie', function(done) {
      request(app)
      .post('/v1/movies')
      .set('Accept', 'application/json')
      .send({ title: 'post', director_name: 'post', summary: 'post' })
      .end(function(err, res) {
        if (err) {
          throw new Error('Fail movie post');
        }

        request(app)
        .delete('/v1/movies/' + res.body.insertId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });

    it('should fail to delete movie if not exist movie id', function(done) {
      request(app)
      .delete('/v1/movies/' + 'invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });
});
