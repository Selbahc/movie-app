import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { TextField } from 'material-ui';

import MovieDisplay from './movieDisplay';

import configApi from '../../config-api';

class SearchBar extends Component {
  state = {
    query: '',
    matchingMovies: [],
    fetching: false
  };
  
  handleSearch = (e, newValue) => {
    if (newValue.length > 0) {

      this.setState(
        (prevState, props) => ({ query: newValue, fetching: true }), 
        () => {
          this.props.setIsSearchingState(this.state.fetching);
          this.fetchMovieByTitle();
        }
      );

    } else {

      this.setState(
        () => ({ query: '', matchingMovies: [], fetching: false }),
        () => this.props.setIsSearchingState(this.state.fetching)
      );

    }
  }

  fetchMovieByTitle = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${configApi.apiKey}&language=en-US&query=${this.state.query}&page=1&include_adult=false`)
    .then(res => res.json())
    .then(data => this.setState({ matchingMovies: data, fetching: false }))
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Search a movie"
          hintText="By title"
          fullWidth={true}
          onChange={(e, newValue) => this.handleSearch(e, newValue)}
        />
        {this.state.fetching &&
          <CircularProgress style={{ display: "block", margin: "0 auto" }} />
        }
        {this.state.query.length > 0 && 
        this.state.matchingMovies.results &&
          <MovieDisplay title={'Search results'} movies={this.state.matchingMovies.results}/>
        }
      </div>
    );
  }
}

export default SearchBar;