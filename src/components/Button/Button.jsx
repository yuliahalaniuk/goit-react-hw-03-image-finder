import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ handleLoadMore }) => (
  <button onClick={handleLoadMore} className={css.loadMoreBtn}>
    Load more
  </button>
);

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
