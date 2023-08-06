import React from 'react';
import css from './ImageGalleryItems.module.css';

const ImageGalleryItem = ({
  onImgClick,
  webformatURL,
  tags,
  largeImageURL,
}) => {
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
};

export default ImageGalleryItem;
