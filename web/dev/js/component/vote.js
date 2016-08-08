'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Jumbotron = ReactBootstrap.Jumbotron;

var Vote = React.createClass({
  render() {
    return (
      <Jumbotron>
        <h1>Votes! </h1>
        <p>Votes!!!!!!</p>
      </Jumbotron>
    );
  }
});

module.exports = Vote;
