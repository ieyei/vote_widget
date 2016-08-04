'use strict';

describe('movies', function() {
  describe('get', function() {
    it('should succeed to get movies list');
  });

  describe('post', function() {
    it('should succeed to create movie');
    it('should fail to create movie with invalid schema');
  });

  describe('put', function() {
    it('should succeed to update movie');
    it('should fail to update movie with invalid schema');
    it('should fail to update movie if not exist movie id');
  });

  describe('delete', function() {
    it('should succeed to delete movie');
    it('should fail to delete movie if not exist movie id');
  });
});
