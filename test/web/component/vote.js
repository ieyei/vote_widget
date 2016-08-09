'use strict';

var React = require('react');
var assert = require('assert');
var mount = require('enzyme').mount;
var shallow = require('enzyme').shallow;
var sinon = require('sinon');

var Vote = require('../../../web/dev/js/component/vote');
var Input = require('../../../web/dev/js/component/input');
var Movie = require('../../../web/dev/js/component/movie');
var Popup = require('../../../web/dev/js/component/popup');

describe('<Vote />', function() {
  it('renders an `.modal-container`', function() {
    var wrapper = shallow(<Vote />);
    assert.equal(wrapper.find('.modal-container').length, 1);
  });

  it('renders one <Input /> component', function() {
    var wrapper = shallow(<Vote />);
    assert.equal(wrapper.find(Input).length, 1);
  });

  it('renders three <Movie /> components after getCandidateMovies', function() {
    sinon.stub(require('jquery'), 'ajax', function(url, options) {
      if (/votes/.test(url) && options.method === 'GET') {
        options.success([
          {id:1, title: 'title', director_name: 'director_name', summary: 'summary'},
          {id:2, title: 'title', director_name: 'director_name', summary: 'summary'},
          {id:3, title: 'title', director_name: 'director_name', summary: 'summary'}
        ], {}, {status: 200});
      }
    });
    var wrapper = mount(<Vote />);
    assert.equal(wrapper.find(Movie).length, 3);
  });

  it('renders one <Popup /> component', function() {
    var wrapper = shallow(<Vote />);
    assert.equal(wrapper.find(Popup).length, 1);
  });
});
