import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import VideoLibrary from 'material-ui/svg-icons/av/video-library';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { getStyles } from 'material-ui/AppBar/AppBar';
import PropTypes from 'prop-types';

import LoginForm from './loginForm';
import SigninForm from './signinForm';

class TopBar extends Component {
  static get contextTypes() {
    return { muiTheme: PropTypes.object.isRequired };
  }

  state = {
    loginForm: false,
    signinForm: false
  }

  toggleForms = (form) => {
    this.setState((prevState) => {
      return { [form]: !prevState[form] }
    })
  }

  submitLoginForm = (formData) => {
    console.log(formData);
  }
  submitSigninForm = (formData) => {
    console.log(formData);    
  }
  
  render() {
    const styles = getStyles(this.props, this.context);

    const loginActions = [
      <FlatButton
        label="Not now..."
        secondary={true}
        onClick={()=>this.toggleForms('loginForm')}
      />,
      <FlatButton
        label="Log me In"
        primary={true}
        type="submit"
        form="loginForm"
      />,
    ];
    
    const signinActions = [
      <FlatButton
        label="Maybe later..."
        secondary={true}
        onClick={()=>this.toggleForms('signinForm')}
      />,
      <FlatButton
        label="Create my Account"
        primary={true}
        type="submit"
        form="signinForm"
      />,
    ];
    return (
      <div>
        <AppBar
          title={<span>HapiMovie</span>}
          iconElementLeft={<IconButton><VideoLibrary /></IconButton>}
          // iconElementRight={<FlatButton onClick={()=>this.toggleForms('loginForm')} label="Login" />}
        >
          <FlatButton style={styles.flatButton} onClick={() => this.toggleForms('loginForm')} label="Login" />
          <FlatButton style={styles.flatButton} onClick={() => this.toggleForms('signinForm')} label="Sign In" />
        </AppBar>
        
        <Dialog
          title="Hello, again !"
          actions={loginActions}
          modal={true}
          open={this.state.loginForm}
          autoScrollBodyContent={true}
        >
          <LoginForm submitLoginForm={this.submitLoginForm} />
        </Dialog>

        <Dialog
          title="Welcome !"
          actions={signinActions}
          modal={true}
          open={this.state.signinForm}
          autoScrollBodyContent={true}
        >
          <SigninForm submitSigninFor={this.submitSigninForm} />
        </Dialog>
        
      </div>
    )
  } 
}

export default TopBar;