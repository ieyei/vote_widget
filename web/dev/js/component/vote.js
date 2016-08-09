'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var request = require('../lib/request');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var Input = require('./input');
var Movie = require('./movie');
var Popup = require('./popup');

var Vote = React.createClass({
  getInitialState() {
    return {
      candidateMovies: [],
      selectedMovieId: -1,
      isLoading: true,
      showModal: false,
      isUserIdValid: false
    };
  },
  componentDidMount() {
    request.get('v1/votes', res => {
      if (res.status != 200) {
        throw new Error('cannot load candidate movies');
      }

      this.setState({ candidateMovies: res.body, isLoading: false });
    });
  },
  setMovieActive(movieId) {
    this.setState({ selectedMovieId: movieId });
  },
  submit() {
    this.setState({ isLoading: true });
    request.put('v1/votes', { user_id: this.refs.userId.getValue(), movie_id: this.state.selectedMovieId }, res => {
      if (res.status != 200) {
        throw new Error('cannot save favorite movies');
      }

      this.setState({ isLoading: false, showModal: true });
    });
  },
  getUserIdValidationState(value) {
    if (value === '') {
      return;
    } else if (value > 0) {
      return 'success';
    } else if (value <= 0){
      return 'error';
    }
  },
  getSubmitValidationState() {
    if (this.state.selectedMovieId === -1) {
      return false;
    }

    return this.state.isUserIdValid;
  },
  inputChanged(e) {
    if (this.getUserIdValidationState(e.target.value) === 'success') {
      this.setState({ isUserIdValid: true });
    } else {
      this.setState({ isUserIdValid: false });
    }
  },
  render() {
    var canSubmit = !this.state.isLoading && this.getSubmitValidationState();
    return (
      <div className="modal-container">
        <Grid>
          <Row>
            <Col lg={12} className="text-center">
              <h2>Vote Favorite Movies</h2>
              <h3 className="text-muted">Vote your Favorite Movie</h3>
            </Col>
          </Row>
          <Row>
            <Input
              controlId="userId"
              validationState={this.getUserIdValidationState}
              onChange={this.inputChanged}
              label="User Id"
              type="number"
              placeholder="Enter Your Id"
              ref="userId"
            />
          </Row>
          <Row>
            {this.state.candidateMovies.map((movie) => {
              var panelStyle = (this.state.selectedMovieId === movie.id) ? 'primary' : 'default';
              return (
                <Movie
                  onClick={this.setMovieActive}
                  movieId={movie.id}
                  key={movie.id}
                  title={movie.title}
                  director_name={movie.director_name}
                  summary={movie.summary}
                  panelStyle={panelStyle}
                />
              );
            })}
          </Row>
          <Row>
            <Button bsStyle="primary"
              disabled={!canSubmit}
              onClick={canSubmit ? this.submit : null}
            >
              Submit
            </Button>
          </Row>
        </Grid>
        <Popup
          showModal={this.state.showModal}
          container={this}
          title="Success"
          content="Save your favorite movie successfully"
          goto="home"
        />
      </div>
    );
  }
});

module.exports = Vote;
