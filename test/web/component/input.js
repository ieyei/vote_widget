'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var assert = require('assert');
var mount = require('enzyme').mount;
var shallow = require('enzyme').shallow;
var sinon = require('sinon');

var Input = require('../../../web/dev/js/component/input');

var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;

describe('<Input />', function() {
  it('renders a `<form>`', function() {
    var wrapper = shallow(
      <Input
        controlId="userId"
        validationState={()=>{}}
        onChange={()=>{}}
        label="User Id"
        type="number"
        placeholder="Enter Your Id"
        ref="userId"
      />);
    assert.equal(wrapper.find('form').length, 1);
  });

  it('renders a FormGroup, a ControlLabel and a FormControl', function() {
    var wrapper = shallow(
      <Input
        controlId="userId"
        validationState={()=>{}}
        onChange={()=>{}}
        label="User Id"
        type="number"
        placeholder="Enter Your Id"
        ref="userId"
      />);
    assert.equal(wrapper.find(FormGroup).length, 1);
    assert.equal(wrapper.find(ControlLabel).length, 1);
    assert.equal(wrapper.find(FormControl).length, 1);
  });

  it('simulates change events', function() {
    var getValidationState = sinon.spy();
    var onChange = sinon.spy();
    var wrapper = mount(
      <Input
        controlId="userId"
        validationState={getValidationState}
        onChange={onChange}
        label="User Id"
        type="number"
        placeholder="Enter Your Id"
        ref="userId"
      />);
    assert.equal(getValidationState.callCount, 1);
    wrapper.find(FormControl).simulate('change', { target: { value: 20 } } );
    assert.equal(getValidationState.callCount, 2);
    assert.equal(onChange.callCount, 1);
  })
});
