import React, { Component } from "react";
import { Tabs, Tab } from 'material-ui';
import { withRouter } from "react-router-dom";

class TabsBar extends Component {

  handleCallToRouter = (value) => {
    this.props.history.push(value);
  }

  render() {
    return (
      <Tabs value={this.props.history.location.pathname} onChange={this.handleCallToRouter}>
        <Tab label="Popular" value="/popular" />
        {this.props.isLoggedIn &&
          <Tab label="Favorites" value="/favorites" />
        }
        {this.props.isLoggedIn &&
          <Tab label="Watch List" value="/watchlist" />        
        }
      </Tabs>
    )
  }
}

export default withRouter(TabsBar);