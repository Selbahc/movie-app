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
      pageToFetch: 1
    } 
  }
  
  fetchPopular() {
    console.log(this.state.pageToFetch);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiConfig.apiKey}&language=${localStorage.getItem('lang')}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${this.state.pageToFetch}`)
    .then(response => response.json())
    .then(data => this.setState(prevState => {
      return { 
        pageToFetch: prevState.pageToFetch += 1,
        popularList: [...this.state.popularList, ...data.results]
      }
    }))
    .catch(err => {
      throw err 
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.languageDidUpdate !== this.props.languageDidUpdate
      && nextProps.languageDidUpdate === true) {
        this.setState({ pageToFetch: 1, popularList: [] }, () => this.fetchPopular)
      }
  }

  render() {
    return (
      <InfiniteScroll
        loadMore={() => this.fetchPopular()}
        hasMore={true}
        loader={<CircularProgress style={{display: "block", margin: "0 auto"}}/>}
      >
        <MovieDisplay title={'Popular movies'} openSnackbar={this.props.openSnackbar} movies={this.state.popularList} />
      </InfiniteScroll>
    );
  }
}

export default FetchPopular;