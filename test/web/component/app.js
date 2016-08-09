'use strict';

var React = require('react');
var assert = require('assert');
var shallow = require('enzyme').shallow;

var App = require('../../../web/dev/js/component/app');

describe('<App />', function() {
  it('renders an `#content`', function() {
    var wrapper = shallow(<App />);
    assert.equal(wrapper.find('#content').length, 1);
  });

  it('renders children when passed in', function() {
    var wrapper = shallow(
      <App>
        <div className="unique" />
      </App>
    );
    assert.equal(wrapper.contains(<div className="unique" />), true);
  });
});
