'use strict';

describe('users', function() {
  describe('get', function() {
    it('should succeed to get users list');
  });

  describe('post', function() {
    it('should succeed to create user');
    it('should fail to create user with invalid schema');
  });

  describe('put', function() {
    it('should succeed to update user');
    it('should fail to update user with invalid schema');
    it('should fail to update user if not exist user id');
  });

  describe('delete', function() {
    it('should succeed to delete user');
    it('should fail to delete user if not exist user id');
  });
});
