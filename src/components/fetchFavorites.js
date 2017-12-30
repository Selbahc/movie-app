import React, { Component } from 'react';
import MovieDisplay from './movieDisplay';

class FetchFavorites extends Component {
  state = { favorites: null }


  render() {
    return (
      <MovieDisplay movies={this.state.favorites} />
    );
  }
}

export default FetchFavorites;