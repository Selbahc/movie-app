import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';

const redirect = (tab, history) => { history.push(`${tab.props['data-route']}`) }

const TabsBar = withRouter(({ history, isLoggedIn }) => (
  <Tabs>
    <Tab label="Popular" data-route="/popular" onActive={ (tab) => redirect(tab, history) } />
    {isLoggedIn &&     
      <Tab label="Favorites" data-route="/favorites" onActive={ (tab) => redirect(tab, history) } />
    }
    {isLoggedIn &&
      <Tab label="Watch List" data-route="/watch-list" onActive={ (tab) => redirect(tab, history) } />
    }
  </Tabs>
));

export default TabsBar;