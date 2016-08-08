'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactRouterBootstrap = require('react-router-bootstrap');

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var LinkContainer = ReactRouterBootstrap.LinkContainer;

var Popup = React.createClass({
  propTypes: {
    showModal: React.PropTypes.bool,
    container: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.func
    ]),
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    goto: React.PropTypes.string.isRequired,
  },
  getDefaultProps() {
    return {
      showModal: false,
      container: this
    };
  },
  render() {
    return (
      <Modal
        show={this.props.showModal}
        container={this.props.container}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
        <Modal.Footer>
          <LinkContainer to={this.props.goto}>
            <Button>Close</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = Popup;
