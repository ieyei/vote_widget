'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var assert = require('assert');
var shallow = require('enzyme').shallow;
var mount = require('enzyme').mount;

var Modal = ReactBootstrap.Modal;
var Popup = require('../../../web/dev/js/component/popup');

describe('<Popup />', function() {
  it('renders a <Modal />', function() {
    var wrapper = shallow(<Popup title="title" content="content" goto="goto" />);
    assert.equal(wrapper.find(Modal).length, 1);
  });

  it('renders a <Modal.Header />, a <Modal.Body /> and a <Modal.Footer />', function() {
    var wrapper = shallow(<Popup title="title" content="content" goto="goto" />);
    assert.equal(wrapper.find(Modal.Header).length, 1);
    assert.equal(wrapper.find(Modal.Body).length, 1);
    assert.equal(wrapper.find(Modal.Footer).length, 1);
  });
});
