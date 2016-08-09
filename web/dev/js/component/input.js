'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;

var Input = React.createClass({
  propTypes: {
    controlId: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf([ 'number', 'text' ]).isRequired,
    validationState: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string
  },
  getInitialState() {
    return {
      value: ''
    };
  },
  getValue() {
    return this.state.value;
  },
  render() {
    return (
      <form>
        <FormGroup
          controlId={this.props.controlId}
          validationState={this.props.validationState(this.state.value)}
        >
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            type={this.props.type}
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={(e) => { this.setState({ value: e.target.value }); this.props.onChange(e); }}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
});

module.exports = Input;
