import React, { Component } from 'react';

import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <div className={css.ImageListContainer}>
          <ImageGallery name={this.state.searchQuery} />
        </div>
      </>
    );
  }
}

export default App;
