import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';

import apiConfig from '../../config-api';

import MovieDisplay from './movieDisplay';

class FetchPopular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popularList: [],
      fetching: true,
      pageToFetch: 1
    } 
  }
  
  fetchPopular() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiConfig.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${this.state.pageToFetch}`)
    .then(response => response.json())
    .then(data => this.setState(prevState => {
      return { 
        pageToFetch: prevState.pageToFetch += 1,
        popularList: [...this.state.popularList, ...data.results], 
        fetching: false
      }
    }))
    .catch(err => {
      throw err 
    });
  }

  render() {
    return (
      <InfiniteScroll
        loadMore={() => this.fetchPopular()}
        hasMore={true}
        loader={<CircularProgress style={{display: "block", margin: "0 auto"}}/>}
      >
        <MovieDisplay openSnackbar={this.props.openSnackbar} movies={this.state.popularList} />
      </InfiniteScroll>
    );
  }
}

export default FetchPopular;