import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import apiConfig from '../../config-api';

import MovieDisplay from './movieDisplay';

class FetchPopular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popularList: [],
      fetching: true
    } 
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiConfig.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(response => response.json())
      .then(data => this.setState({ popularList: data.results, fetching: false }));
  }
  
  render() {
    return (
      <div>
        {this.state.fetching
          ? <CircularProgress size={80} thickness={5} style={{display: 'block', margin: '2em auto'}} /> 
          : <MovieDisplay openSnackbar={this.props.openSnackbar} movies={this.state.popularList} />
        }
      </div>
    );
  }
}

export default FetchPopular;