import React, { Component } from 'react';
import MovieDisplay from './movieDisplay';
import favorite from 'material-ui/svg-icons/action/favorite';
import CircularProgress from 'material-ui/CircularProgress';
import apiConfig from '../../config-api';

import addTokenToHeaders from '../utils/addTokenToHeaders';


class FetchFavorites extends Component {
  state = { favorites: [], fetching: true }

  callApiFromUserFavorites = (userFavoritesList) => {
    userFavoritesList.map(userFavorite => {
      fetch(`https://api.themoviedb.org/3/movie/${userFavorite.uid}?api_key=${apiConfig.apiKey}&language=${localStorage.getItem('lang')}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          favorites: [...this.state.favorites, data],
          fetching: false
        });
      });
    });
  }

  componentDidMount() {
    const headers = addTokenToHeaders();
    fetch('/api/favorites', { headers })
    .then(res => res.json())
    .then(jsonResponse => {
      if (jsonResponse.success) {
       this.callApiFromUserFavorites(jsonResponse.favorites);
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.fetching 
          ? <CircularProgress size={80} thickness={5} style={{ display: 'block', margin: '2em auto' }} />
          : <MovieDisplay title={'Favorites movies'} movies={this.state.favorites} />
        }
      </div>
    );
  }
}

export default FetchFavorites;