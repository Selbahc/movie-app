import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import { yellowA100, pinkA200 } from 'material-ui/styles/colors';
export default () => (
  <div style={{display: 'flex'}}>
    <p style={{ color: pinkA200, marginRight: '.5em' }}>French</p>
    <Toggle
      label="English"
      defaultToggled={localStorage.getItem('lang') === 'fr-FR' ? false : true}
      labelPosition={'right'}
      style={{ marginTop: 16 }}
      labelStyle={{ color: yellowA100 }}
      onToggle={(e, isInputChecked) => {
        isInputChecked ? localStorage.setItem('lang', 'en-US') : localStorage.setItem('lang', 'fr-FR');
      }}
    />
  </div>
);