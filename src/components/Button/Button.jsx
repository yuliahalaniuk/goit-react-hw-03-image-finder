import css from './Button.module.css';

const Button = ({ handleLoadMore }) => (
  <button onClick={handleLoadMore} className={css.loadMoreBtn}>
    {' '}
    Load more
  </button>
);

export default Button;
