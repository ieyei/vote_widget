'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactRouterBootstrap = require('react-router-bootstrap');

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var LinkContainer = ReactRouterBootstrap.LinkContainer;

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return (
      <div className='app'>
        <Navbar>
          <Nav>
            <LinkContainer to="home">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="votes">
              <NavItem>Votes</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <div id='content' className='container-fluid'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
