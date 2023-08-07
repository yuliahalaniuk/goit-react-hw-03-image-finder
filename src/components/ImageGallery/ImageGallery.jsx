import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { fetchImages } from '../api/api';

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
  totalHits = 0;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ status: STATUS.PENDING, foundResults: [] });
      this.page = 1;
      this.getImages(this.props.name);
    }
  }

  getImages = async neededQuery => {
    try {
      await fetchImages(this.page, neededQuery).then(({ hits, totalHits }) => {
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
      });
    } catch (error) {
      this.setState({ status: STATUS.REJECTED_FAILED });
    }
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
    this.getImages(this.props.name);
  };

  render() {
    const { status, foundResults, modalOpen, largeImageURL } = this.state;
    const { onLoadMoreBtnClick, onImgClick, modalToggle, totalHits } = this;

    if (status === STATUS.IDLE) {
      return <p className={css.warningText}>Please enter you request</p>;
    }

    if (status === STATUS.PENDING) {
      return <Loader />;
    }

    if (status === STATUS.REJECTED_NOT_FOUND) {
      return (
        <div className={css.warningText}>
          Sorry, nothing found for {this.props.name}. Please try again
        </div>
      );
    }

    if (status === STATUS.REJECTED_FAILED) {
      return (
        <div className={css.warningText}> Opps... Something went wrong</div>
      );
    }

    if (status === STATUS.RESOLVED) {
      return (
        <>
          <ul className={css.imgList}>
            {foundResults &&
              foundResults.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                  key={id}
                  onImgClick={onImgClick}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                />
              ))}
          </ul>

          {foundResults.length < totalHits ? (
            <Button handleLoadMore={onLoadMoreBtnClick} />
          ) : (
            <div className={css.warningText}>
              You've reached the end of the results
            </div>
          )}

          {modalOpen && <Modal imgUrl={largeImageURL} onClose={modalToggle} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ImageGallery;
