#!/usr/bin/env node

var app = require('../web/app');

app.set('port', process.env.API_PORT || 4000);

var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
