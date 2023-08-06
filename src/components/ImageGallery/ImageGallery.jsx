import React, { Component } from 'react';
import css from './ImageGallery.module.css';

import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED_FAILED: 'rejected_failed',
  REJECTED_NOT_FOUND: 'rejected_not_found',
  RESOLVED: 'resolved',
};

class ImageGallery extends Component {
  state = {
    foundResults: [],
    status: STATUS.IDLE,
    modalOpen: false,
    largeImageURL: '',
  };

  page = 1;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ status: STATUS.PENDING });
      this.fetchImgs(this.props.name);
    }
  }

  resetPage = () => {
    this.setState({ page: 1 });
  };

  fetchImgs = neededQuery => {
    const API_KEY = '37711796-3b567f1c67dcaa6a50c805c9a';
    const PER_PAGE = 12;
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${neededQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=${PER_PAGE}`;

    fetch(BASE_URL)
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          this.setState({ status: STATUS.REJECTED_NOT_FOUND });
          return;
        }

        this.setState(prevState => {
          return {
            foundResults: prevState.foundResults
              ? [...prevState.foundResults, ...hits]
              : hits,
            status: STATUS.RESOLVED,
          };
        });
      })
      .catch(error => {
        this.setState({ status: STATUS.REJECTED_FAILED });
      });
  };

  modalToggle = bool => {
    this.setState({
      modalOpen: bool,
    });
  };

  onImgClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.modalToggle(true);
  };

  onLoadMoreBtnClick = e => {
    this.page += 1;
    this.fetchImgs(this.props.name);
  };

  render() {
    if (this.state.status === STATUS.IDLE) {
      return <p className={css.warningText}>Please enter you request</p>;
    }

    if (this.state.status === STATUS.PENDING) {
      return <Loader />;
    }

    if (this.state.status === STATUS.REJECTED_NOT_FOUND) {
      return (
        <div className={css.warningText}>
          Sorry, nothing found for {this.props.name}. Please try again
        </div>
      );
    }

    if (this.state.status === STATUS.REJECTED_FAILED) {
      return (
        <div className={css.warningText}> Opps... Something went wrong</div>
      );
    }

    if (this.state.status === STATUS.RESOLVED) {
      return (
        <>
          <ul className={css.imgList}>
            {this.state.foundResults &&
              this.state.foundResults.map(
                ({ id, webformatURL, tags, largeImageURL }) => (
                  <ImageGalleryItem
                    key={id}
                    onImgClick={this.onImgClick}
                    webformatURL={webformatURL}
                    tags={tags}
                    largeImageURL={largeImageURL}
                  />
                )
              )}
          </ul>

          <Button handleLoadMore={this.onLoadMoreBtnClick} />

          {this.state.modalOpen && (
            <Modal
              imgUrl={this.state.largeImageURL}
              onClose={this.modalToggle}
            />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
