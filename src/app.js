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

import ToggleLanguage from './components/toggleLanguage';
import Snackbar from 'material-ui/Snackbar';


class App extends Component {
  state = {
    isLoggedIn: sessionStorage.getItem('token') ? true : false,
    snackbar: {
      open: false,
      message: ''
    },
    isSearching: false,
    languageDidUpdate: false
  }

  openSnackbarWithMessage = (message) => {
    this.setState({
      snackbar: {
        open: true,
        message
      }
    })
  }

  handleSnackbarClosing = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    })
  }

  setLoginStatus = (status) => {
    this.setState({ isLoggedIn: status });
  }

  setIsSearchingState = (state) => {
    this.setState({ isSearching: state });
  }

  componentDidMount() {
    if (localStorage.getItem('lang') == null) localStorage.setItem('lang', 'en-US');
  }

  updateLanguage = () => {
    this.setState({ languageDidUpdate: true}, () => {
      setTimeout(() => this.setState({ languageDidUpdate: false }), 1000)
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div>
            <TopBar setLoginStatus={this.setLoginStatus} isLoggedIn={this.state.isLoggedIn} openSnackbar={this.openSnackbarWithMessage}/>
            <TabsBar isLoggedIn={this.state.isLoggedIn} />
            <ToggleLanguage updateLanguage={this.updateLanguage} />
            <SearchBar setIsSearchingState={this.setIsSearchingState} />
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/popular" />} />
              <Route
                path="/popular"
                render={(props) => <FetchPopular {...props} languageDidUpdate={this.state.languageDidUpdate} openSnackbar={this.openSnackbarWithMessage} />} 
              />
              {this.state.isLoggedIn &&
                // <Route path="/favorites" render={() => this.state.isLoggedIn ? FetchFavorite : <Redirect to={"/"} />} />
                <Route
                  path="/favorites"
                render={(props) => <FetchFavorite {...props} languageDidUpdate={this.state.languageDidUpdate} openSnackbar={this.openSnackbarWithMessage} />}
                />
              }
              <Route path="*" component={NotFound} />
            </Switch>
            
            <Snackbar
              open={this.state.snackbar.open}
              message={this.state.snackbar.message}
              onRequestClose={this.handleSnackbarClosing}
            />
          </div>
        </BrowserRouter>          
      </MuiThemeProvider>
    );
  }
}

export default App;