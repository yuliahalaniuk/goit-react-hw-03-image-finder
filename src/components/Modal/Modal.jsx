import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalEl = document.querySelector('#modal');

class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose(false);
    }
  };

  hadleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose(false);
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  render() {
    return createPortal(
      <div className={css.modalBackdrop} onClick={this.hadleBackdropClick}>
        <div className={css.modalBlock}>
          <img src={this.props.imgUrl} alt="modal" className={css.modalImg} />
        </div>
      </div>,
      modalEl
    );
  }
}

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
