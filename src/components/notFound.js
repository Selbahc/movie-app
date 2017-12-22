import React from 'react';


import { yellowA100, pinkA200, grey600 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const style = {
  height: "60vh",
  width: "60%",
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: pinkA200,
  color: yellowA100
};

const NotFound = () =>
  <div style={{width: "100%", textAlign: "center"}}>
    <Link to="/">
      <Paper style={style} zDepth={2}>
      <div style={{height: "100%", display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column"}}>
        <p style={{fontSize: "1.2em"}}>Sorry, page not found</p>
        <ThumbDown color={yellowA100}/>
        <p style={{ fontStyle: "italic" }}>Back to Popular Movies</p>        
      </div>
      </Paper>
    </Link>
  </div>

export default NotFound;