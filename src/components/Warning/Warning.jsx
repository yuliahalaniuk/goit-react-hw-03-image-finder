import css from './Warning.module.css';

const Warning = ({ message }) => <p className={css.warningText}>{message}</p>;

Warning.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Warning;
