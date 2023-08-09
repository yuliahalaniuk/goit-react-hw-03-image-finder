import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    modalOpen: false,
    largeImageURL: '',
  };

  modalToggle = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  onImgClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.modalToggle();
  };

  render() {
    const { modalOpen, largeImageURL } = this.state;
    const { foundResults } = this.props;
    const { onImgClick, modalToggle } = this;

    return (
      <>
        <ul className={css.imgList}>
          {foundResults.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              onImgClick={onImgClick}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>

        {modalOpen && <Modal imgUrl={largeImageURL} onClose={modalToggle} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  foundResults: PropTypes.array.isRequired,
};

export default ImageGallery;
