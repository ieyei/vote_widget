'use strict';

var mysql = require('mysql');
var Promise = require('bluebird');
Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var config = require('../../config/db');

var pool = mysql.createPool(config);

function getSqlConnection() {
  return pool.getConnectionAsync().disposer(function(connection) {
    connection.release();
  });
}


module.exports = getSqlConnection;
