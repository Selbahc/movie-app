import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import headers from '../utils/tokenHeaders';

class MovieTileMenu extends Component {

  addToFavorite = (movieId) => {
    fetch(`api/favorites/add/${movieId}`, {
      method: 'POST',
      headers
    })
    .then(res => res.json())
    .then(jsonResponse => this.props.openSnackbar(jsonResponse.message))
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Favorite"
          leftIcon={<FavoriteBorder />}
          onClick={() => this.addToFavorite(this.props.movieId) }
        />
        <MenuItem
          primaryText="Watch List"
          />
        <MenuItem
          primaryText="Mark as seen"
          leftIcon={<VisibilityOff />}
        />  
      </IconMenu>
    );
  }
}

export default MovieTileMenu;