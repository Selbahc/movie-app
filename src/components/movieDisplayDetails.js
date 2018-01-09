import React from 'react';
import { pinkA200, yellowA100 } from 'material-ui/styles/colors';

export default ({ movie }) => (
  <div style={{display: 'flex'}}>
    
    <div style={{ textAlign: 'justify', margin: '1em', flex: '2' }}>    
      <p>Overview:</p>
      <p style={{color: yellowA100}}>{movie.overview}</p>
      <div>
        <img style={{margin: '0 auto'}} src={sessionStorage.getItem(movie.id)} alt='Movie Poster' />
      </div>
    </div>

    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', margin: '1em' }}>    
      <div>
        <p>Original title:</p>
        <p style={{color: pinkA200}}>{movie.original_title}</p>
      </div>
      <div>
        <p>Release date: </p>
        <p style={{color: pinkA200}}>{movie.release_date}</p>  
      </div>
      <div>
        <p>Vote average:</p>
        <p style={{color: pinkA200}}>{movie.vote_average}</p>
      </div>
      <div>
        <p>Original language:</p>
        <p style={{color: pinkA200}}>{movie.original_language}</p>
      </div>
    </div>
  </div>
);