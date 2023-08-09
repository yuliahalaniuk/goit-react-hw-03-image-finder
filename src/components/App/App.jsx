import React, { Component } from 'react';

import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { fetchImages } from '../../api/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED_FAILED: 'rejected_failed',
  REJECTED_NOT_FOUND: 'rejected_not_found',
  RESOLVED: 'resolved',
};

class App extends Component {
  state = {
    searchQuery: '',
    foundResults: [],
    status: STATUS.IDLE,
    page: 1,
    isLoading: false,
  };

  totalHits = 0;

  handleSearchSubmit = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  onLoadMoreBtnClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async neededQuery => {
    try {
      this.setState({ isLoading: true });
      await fetchImages(this.state.page, neededQuery).then(
        ({ hits, totalHits }) => {
          this.totalHits = totalHits;

          if (hits.length === 0) {
            this.setState({ status: STATUS.REJECTED_NOT_FOUND });
            return;
          }

          this.setState(prevState => ({
            foundResults: prevState.foundResults
              ? [...prevState.foundResults, ...hits]
              : hits,
            status: STATUS.RESOLVED,
          }));
        }
      );
    } catch (error) {
      this.setState({ status: STATUS.REJECTED_FAILED });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      if (prevState.searchQuery !== this.state.searchQuery) {
        this.setState({ status: STATUS.PENDING, foundResults: [] });
        this.getImages(this.state.searchQuery);
        return;
      }

      this.getImages(this.state.searchQuery);
    }
  }

  render() {
    const { handleSearchSubmit } = this;
    const { searchQuery, status, foundResults, isLoading } = this.state;
    const shouldRenderLoadMoreButton = foundResults.length < this.totalHits;

    console.log(this.totalHits);
    return (
      <>
        <Searchbar onSubmit={handleSearchSubmit} />
        <div className={css.ImageListContainer}>
          {status === STATUS.IDLE && (
            <p className={css.warningText}>Please enter you request</p>
          )}

          {status === STATUS.PENDING && <Loader />}

          {status === STATUS.REJECTED_FAILED && (
            <div className={css.warningText}> Opps... Something went wrong</div>
          )}

          {status === STATUS.REJECTED_NOT_FOUND && (
            <div className={css.warningText}>
              Sorry, nothing found for {searchQuery}. Please try again
            </div>
          )}

          {status === STATUS.RESOLVED && (
            <>
              <ImageGallery foundResults={foundResults} />

              {isLoading ? (
                <Loader />
              ) : shouldRenderLoadMoreButton ? (
                <Button handleLoadMore={this.onLoadMoreBtnClick} />
              ) : (
                <div className={css.warningText}>
                  You've reached the end of the results
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
