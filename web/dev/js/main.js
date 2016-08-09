'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

var App = require('./component/app');
var Index = require('./component/index');
var Vote = require('./component/vote');

var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var routes = (
  <Router history = {ReactRouter.browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Index} />
         <Route path = "home" component = {Index} />
         <Route path = "votes" component = {Vote} />
      </Route>
  </Router>
);

ReactDom.render(routes, document.getElementById('app'));
