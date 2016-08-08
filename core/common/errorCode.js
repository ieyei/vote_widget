'use strict';

exports.NotFound = function () {
  var err = new Error('Not Found');
  err.status = 404;

  return err;
};

exports.BadRequest = function(message) {
  var err = new Error('Bad Request');
  err.status = 400;
  err.message = message;

  return err;
};

exports.UnprocessableEntity = function(message) {
  var err = new Error('Unprocessable Entity');
  err.status = 422;
  err.message = message;

  return err;
};
