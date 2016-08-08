'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Jumbotron = ReactBootstrap.Jumbotron;

var Index = React.createClass({
  render() {
    return (
      <Jumbotron>
        <h1>Hello! </h1>
        <p>Hello world!!</p>
      </Jumbotron>
    );
  }
});

module.exports = Index;
