'use strict';

var apiServerBaseUrl = 'http://localhost:3000/';

function sendRequest(url, method, data, callback) {
  $.ajax(apiServerBaseUrl + url, {
    method: method.toUpperCase(),
    data: method === 'get' ? data : JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success(data, _, xhr) {
      callback({
        status: xhr.status,
        body: data
      });
    },
    error(xhr) {
      callback({
        status: xhr.status,
        body: xhr.responseText
      });
    }
  });
}

var supportedMethods = ['get', 'post', 'delete', 'put'];

module.exports = supportedMethods.reduce(function (exports, method) {
  exports[method] = function (url, dataOrCallback, callback) {
    var data = dataOrCallback;
    if (typeof dataOrCallback === 'function') {
      callback = dataOrCallback;
      data = {};
    }

    sendRequest(url, method, data, callback);
  };
  return exports;
}, {});
