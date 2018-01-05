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
    signinForm: false,
  }

  toggleForms = (form) => {
    this.setState((prevState) => {
      return { [form]: !prevState[form] }
    })
  }

  submitLoginForm = (formData) => {
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);

    fetch('/api/login', {
      method: 'POST',
      body: form,
    })
      .then(result => result.json())
      .then(response => {
        this.props.openSnackbar(response.message);        
        this.props.setLoginStatus(response.success);
        response.token
          ? sessionStorage.setItem('token', response.token)
          : sessionStorage.removeItem('token');
        this.toggleForms('loginForm');
      })
      .catch(err => console.log(err))
  }
  

  submitSigninForm = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      return this.props.openSnackbar('No matching passwords !');      
    }

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("continent", formData.continent);

    fetch('api/register', {
      method: 'POST',
      body: form,
    })
      .then(result => result.json())
      .then(response => { 
        this.props.openSnackbar(response.message);
        this.toggleForms('signinForm');
      })
  }

  logOut = () => {
    sessionStorage.removeItem('token');
    this.props.setLoginStatus(false);
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

    const isLoggedOut = <div>
      <FlatButton style={styles.flatButton} onClick={() => this.toggleForms('loginForm')} label="Log In" />
      <FlatButton style={styles.flatButton} onClick={() => this.toggleForms('signinForm')} label="Sign In" />
    </div>;
    const isLoggedIn = <FlatButton style={styles.flatButton} onClick={() => this.logOut()} label="Log Out" />;

    return (
      <div>
        <AppBar
          title={<span>HapiMovie</span>}
          iconElementLeft={<IconButton><VideoLibrary /></IconButton>}
        >
          {!this.props.isLoggedIn ? isLoggedOut : isLoggedIn}
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
          <SigninForm submitSigninForm={this.submitSigninForm} />
        </Dialog>
        
      </div>
    )
  } 
}

export default TopBar;