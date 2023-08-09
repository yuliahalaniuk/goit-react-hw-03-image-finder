import css from './Warning.module.css';
import PropTypes from 'prop-types';

const Warning = ({ message }) => <p className={css.warningText}>{message}</p>;

Warning.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Warning;
