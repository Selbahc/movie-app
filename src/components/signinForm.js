import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

class SigninForm extends Component {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault;
    this.props.submitSigninForm(this.state);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form id="SigninForm" onSubmit={e => this.handleSubmit(e)} style={{textAlign: 'center'}}>
        <TextField
          // hintText="At least 4 characters"
          floatingLabelText="First Name"
          type="text"
          name="firstName"
          onChange={e => this.handleInput(e)}
        />
        <TextField
          // hintText="At least 4 characters"
          floatingLabelText="Last Name"
          type="text"
          name="lastName"
          onChange={e => this.handleInput(e)}
        /><br />
        <TextField
          // hintText="At least 4 characters"
          floatingLabelText="Email address"
          type="email"
          name="email"
          onChange={e => this.handleInput(e)}
        />
        <TextField
          // hintText="At least 4 characters"
          floatingLabelText="Country"
          type="text"
          name="country"
          onChange={e => this.handleInput(e)}
        /><br />
        <TextField
          hintText="At least 4 characters"
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={e => this.handleInput(e)}
        />
        <TextField
          hintText="At least 4 characters"
          floatingLabelText="Re-enter password"
          type="password"
          name="confirmPassword"
          onChange={e => this.handleInput(e)}
        />
      </form>
    );
  }
}

export default SigninForm;