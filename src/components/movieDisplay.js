import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import MovieTileMenu from './movieTileMenu';
import MovieDisplayDetails from './movieDisplayDetails';

import { pinkA200 } from 'material-ui/styles/colors';

class MovieDisplay extends Component {

  state = {
    showDetails: false,
    movieToDetail: ''
  }

  openDetails = (movieToDetail) => {
    this.setState({ showDetails: true, movieToDetail });
  }

  closeDetails = () => {
    this.setState({ showDetails: false, movieToDetail: '' });
  }

  render() {
    return (
      <div>
        <GridList
          cellHeight="auto"
          cols={5}
        >
          <Subheader>{this.props.title}</Subheader>
          {this.props.movies.map((movie) => {
            sessionStorage.setItem(movie.id, `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
            return (
            <GridTile
            key={movie.id}
            title={movie.title}
            subtitle={<span>Vote <b>{movie.vote_average}</b></span>}
            actionIcon={<MovieTileMenu movieId={movie.id} openSnackbar={this.props.openSnackbar}/>}
            titleBackground="rgba(0, 0, 0, 0.8)"
            >
                <img onClick={() => this.openDetails(movie)} src={sessionStorage.getItem(movie.id)} />
            </GridTile>
            )
          })}
        </GridList>
        <Dialog
          title={this.state.movieToDetail.title}
          actions={<FlatButton
            label="Close"
            primary={true}
            onClick={this.closeDetails}
          />}
          open={this.state.showDetails}
          onRequestClose={this.closeDetails}
          autoScrollBodyContent={true}
          titleStyle={{color: pinkA200}}
        >
          <MovieDisplayDetails movie={this.state.movieToDetail}/>
        </Dialog>
      </div>
    );
  }
}

export default MovieDisplay;