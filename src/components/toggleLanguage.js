import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import { yellowA100, pinkA200 } from 'material-ui/styles/colors';

class ToggleLanguage extends Component {
  state = {
    isEnglish: localStorage.getItem('lang') === 'fr-FR' ? false : true
  }
  
  render() {
    return (
    <div style={{display: 'flex'}}>
      <p style={{ color: pinkA200, marginRight: '.5em' }}>French</p>
      <Toggle
        label="English"
        defaultToggled={this.state.isEnglish}
        labelPosition={'right'}
        style={{ marginTop: 16, width: 'auto' }}
        labelStyle={{ color: yellowA100 }}
        onToggle={(e, isInputChecked) => {
          isInputChecked ? localStorage.setItem('lang', 'en-US') : localStorage.setItem('lang', 'fr-FR');
          this.props.updateLanguage();
        }}
      />
    </div>
    )
  };
}

export default ToggleLanguage;