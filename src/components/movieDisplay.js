import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const MovieDisplay = ({ popular }) => (
  <div>
    <GridList
      cellHeight="auto"
      cols={6}
    >
      <Subheader>Popular</Subheader>
      {popular.map((tile) => (
        <GridTile
          key={tile.id}
          title={tile.title}
          subtitle={<span>Vote <b>{tile.vote_average}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          titleBackground="rgba(0, 0, 0, 0.8)"
        >
          <img src={`https://image.tmdb.org/t/p/w300/${tile.poster_path}`} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default MovieDisplay;