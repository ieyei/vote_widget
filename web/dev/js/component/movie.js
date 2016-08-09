'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Col = ReactBootstrap.Col;
var Panel = ReactBootstrap.Panel;

var Movie = React.createClass({
  propTypes: {
    movieId: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    panelStyle: React.PropTypes.oneOf(['default', 'primary']).isRequired,
    director_name: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <Col md={4} sm={6} xs={12} onClick={() => this.props.onClick(this.props.movieId)}>
        <Panel header={this.props.title} bsStyle={this.props.panelStyle}>
          <span>{'director_name: ' + this.props.director_name}</span>
          <p>{this.props.summary}</p>
        </Panel>
      </Col>
    );
  }
});

module.exports = Movie;
