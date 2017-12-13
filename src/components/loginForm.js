import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

class LoginForm extends Component {
  state = {  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitLoginForm(this.state);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form id="loginForm" onSubmit={e => this.handleSubmit(e)}>
        <TextField
          // hintText="At least 4 characters"
          floatingLabelText="Email address"
          type="email"
          name="email"
          onChange={e => this.handleInput(e)}
          fullWidth={true}
        /> <br />
        <TextField
          hintText="At least 4 characters"
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={e => this.handleInput(e)}
          fullWidth={true}
        />
      </form>
    );
  }
}

export default LoginForm;