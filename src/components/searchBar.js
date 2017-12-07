import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';

class SearchBar extends Component {
  state = {
    dataSource: ['batman', 'superbat', 'superman', 'men in black'],
  };
  
  render() {
    return (
      <div>
        <AutoComplete
          hintText="by title"
          floatingLabelText="Search a movie"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.dataSource}
          maxSearchResults={3}
          fullWidth={true}
        />
      </div>
    );
  }
}

export default SearchBar;