import React, { Component } from 'react';
import MovieDisplay from './movieDisplay';

import apiConfig from '../../config-api';

class FetchPopular extends Component {
  state = { 
    popularList: []
   }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiConfig.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(response => response.json())
      .then(data => this.setState({ popularList: data.results }, () => console.log(this.state.popularList)));
  }

  render() {
    return (
      <div>
        {this.state.popularList &&
          <MovieDisplay movies={this.state.popularList} />
        }
      </div>
    );
  }
}

export default FetchPopular;