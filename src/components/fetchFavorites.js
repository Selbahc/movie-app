import React, { Component } from 'react';
import MovieDisplay from './movieDisplay';
import favorite from 'material-ui/svg-icons/action/favorite';
import apiConfig from '../../config-api';


class FetchFavorites extends Component {
  state = { favorites: [] }

  componentDidMount() {
    const authHeader = new Headers();
    authHeader.set('token', sessionStorage.getItem('token'));
    fetch('/api/favorites', { headers: authHeader })
      .then(res => res.json())
      .then(jsonResponse => {
        // console.log(jsonResponse);
        jsonResponse.favorites.map(userFavorite => {
          // console.log(userFavorite.uid);
          fetch(`https://api.themoviedb.org/3/movie/${userFavorite.uid}?api_key=${apiConfig.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then(response => response.json())
            .then(data => {
              const favorites = [...this.state.favorites, data]
              this.setState({ favorites: favorites }, () => console.log(this.state.favorites))
            });
        });
      });
  }


  render() {
    return (
      <div>
      {this.state.favorites &&
        <MovieDisplay movies={this.state.favorites} />
      }
      </div>
    );
  }
}

export default FetchFavorites;