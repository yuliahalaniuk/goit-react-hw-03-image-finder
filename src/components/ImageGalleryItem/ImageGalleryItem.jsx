import React, { Component } from 'react';
import css from './ImageGalleryItems.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { onImgClick, webformatURL, tags, largeImageURL } = this.props;

    return (
      <li
        className={css.imgListItem}
        onClick={() => {
          onImgClick(largeImageURL);
        }}
      >
        <img src={webformatURL} className={css.imgListPic} alt={tags} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
