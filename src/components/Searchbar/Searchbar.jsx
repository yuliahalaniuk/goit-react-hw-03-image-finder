import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Write something you idiot');
      return;
    }

    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  handleSearchChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  render() {
    return (
      <header className={css.searchbarWrapper}>
        <form className={css.formWrap} onSubmit={this.handleSearchSubmit}>
          <button type="submit" className={css.searchBtn}>
            <CiSearch className={css.searchIcon} />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.searchInput}
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
