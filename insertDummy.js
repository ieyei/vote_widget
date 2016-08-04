var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'vote_widget'
});

connection.connect();

connection.query('SELECT * from movie', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

function updateUser(index) {
  var random = Math.floor((Math.random() * 100000) + 1);
  connection.query('UPDATE user SET movie_id=? WHERE id=?', [random, index], function(err, result) {
    if (err) throw err;
    if (index <= 100000) {
      updateUser(index+1);
    } else {
      connection.end();
    }
  });
}

function inserUser(index) {
  connection.query('INSERT INTO user SET ?', {name: '유저' + index}, function(err, result) {
    if (err) throw err;
    if (index <= 100000) {
      inserUser(index+1);
    } else {
      updateUser(0);
    }
  });
}

function inserMovie(index) {
  connection.query('INSERT INTO movie SET ?', {title: '영화' + index, director_name: '감독' + index, summary: '요약' + index}, function(err, result) {
    if (err) throw err;
    if (index <= 100000) {
      inserMovie(index+1);
    } else {
      inserUser(0);
    }
  });
}

inserMovie(0);
