import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  yellowA100,
  grey600,
  pinkA200,
  pinkA400,
  pinkA100,
  fullWhite
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: yellowA100,
    primary2Color: yellowA100,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
});

import SearchBar from './components/searchBar';
import TopBar from './components/topBar';
import FetchPopular from './components/fetchPopular';
import FetchFavorite from './components/fetchFavorites';
import NotFound from './components/notFound';
import TabsBar from './components/tabsBar';

class App extends Component {
  state = {
    isLoggedIn: false
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div>
            <TopBar isLoggedIn={this.state.isLoggedIn} />
            <TabsBar isLoggedIn={this.state.isLoggedIn} />
            <SearchBar />
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/popular" />} />
              <Route path="/popular" component={FetchPopular} />
              <Route path="/favorites" component={FetchFavorite} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>          
      </MuiThemeProvider>
    );
  }
}

export default App;