import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import VideoLibrary from 'material-ui/svg-icons/av/video-library';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { getStyles } from 'material-ui/AppBar/AppBar';

import PropTypes from 'prop-types';

import LoginForm from './loginForm';
import SigninForm from './signinForm';
import { log } from 'core-js/library/web/timers';

class TopBar extends Component {
  static get contextTypes() {
    return { muiTheme: PropTypes.object.isRequired };
  }

  state = {
    loginForm: false,
    signinForm: false,
    snackbar: {
      open: false,
      message: ''
    }
  }

  handleSnackbarClosing = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    })
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
        this.setState({
          snackbar: {
            open: true,
            message: response.message
          }
        });
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
      return this.setState({
        snackbar: {
          open: true,
          message: 'No matching passwords !'
        }
      });
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
        this.setState({
          snackbar: {
            open: true,
            message: response.message
          }
        });
        this.toggleForms('signinForm');
      })
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
          <SigninForm submitSigninForm={this.submitSigninForm} />
        </Dialog>

        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          onRequestClose={this.handleSnackbarClosing}
        />
        
      </div>
    )
  } 
}

export default TopBar;