import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const addToFavorite = (movieId) => {
  const authHeader = new Headers();
  authHeader.set('token', sessionStorage.getItem('token'));
  fetch(`api/favorites/add/${movieId}`, {
    method: 'POST',
    headers: authHeader
  })
    .then(res => res.json())
    .then(data => console.log(data))
}

const MovieDisplay = ({ movies }) => (
  <div>
    <GridList
      cellHeight="auto"
      cols={6}
    >
      <Subheader>Popular</Subheader>
      {movies.map((tile) => (
        <GridTile
          key={tile.id}
          title={tile.title}
          subtitle={<span>Vote <b>{tile.vote_average}</b></span>}
          actionIcon={<IconButton onClick={(e, movieId) => addToFavorite(tile.id)}><FavoriteBorder color="white" /><VisibilityOff color="white" /></IconButton>}
          titleBackground="rgba(0, 0, 0, 0.8)"
        >
          <img src={`https://image.tmdb.org/t/p/w300/${tile.poster_path}`} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default MovieDisplay;