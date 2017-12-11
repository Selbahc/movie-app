import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SigninForm extends Component {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitSigninForm(this.state);
    // this.setState({});
  }

  handleInput = (e) => {
    if (e.target.innerText) return this.setState({
      continent: e.target.innerText
    });
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form id="signinForm" onSubmit={e => this.handleSubmit(e)} >
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
        />
        <br />
        <TextField
          // hintText="At least 4 characters"
          floatingLabelText="Email address"
          type="email"
          name="email"
          onChange={e => this.handleInput(e)}
        />
        <br />
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
        <br />
        <SelectField
          floatingLabelText="Continent"
          onChange={e => this.handleInput(e)}
          value={this.state.continent}
        >
          <MenuItem value={"Africa"} primaryText="Africa" />
          <MenuItem value={"Antartica"} primaryText="Antartica" />
          <MenuItem value={"Asia"} primaryText="Asia" />
          <MenuItem value={"Australia"} primaryText="Australia" />
          <MenuItem value={"Europe"} primaryText="Europe" />
          <MenuItem value={"North America"} primaryText="North America" />
          <MenuItem value={"South America"} primaryText="South America" />
        </SelectField>
      </form>
    );
  }
}

export default SigninForm;