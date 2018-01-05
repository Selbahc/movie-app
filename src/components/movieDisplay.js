import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import MovieTileMenu from './movieTileMenu';

const MovieDisplay = ({ movies, openSnackbar }) => (
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
          actionIcon={<MovieTileMenu movieId={tile.id} openSnackbar={openSnackbar}/>}
          titleBackground="rgba(0, 0, 0, 0.8)"
        >
          <img src={`https://image.tmdb.org/t/p/w300/${tile.poster_path}`} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default MovieDisplay;