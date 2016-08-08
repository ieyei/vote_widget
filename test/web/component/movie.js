'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var assert = require('assert');
var mount = require('enzyme').mount;
var sinon = require('sinon');

var Col = ReactBootstrap.Col;

var Movie = require('../../../web/dev/js/component/movie');

describe('<Movie />', function() {
  it('allows us to set props', function(done) {
    var onClick = sinon.spy();
    var wrapper = mount(
      <Movie
        movieId={1}
        onClick={onClick}
        title="title"
        panelStyle="default"
        director_name="director_name"
        summary="summary"
      />
    );
    assert.equal(wrapper.props().title, 'title');
    wrapper.setProps({ summary: 'foo' });
    assert.equal(wrapper.props().summary, 'foo');
    done();
  });

  it('simulates click events', function(done) {
    var onClick = sinon.spy();
    var wrapper = mount(
      <Movie
        movieId={1}
        onClick={onClick}
        title="title"
        panelStyle="default"
        director_name="director_name"
        summary="summary"
      />
    );
    wrapper.find(Col).simulate('click');
    assert.equal(onClick.callCount, 1);
    done();
  });
});
