import styles from './Pagination.module.css';

const Pagination = ({
  currentPage,
  setCurrentPage,
  charactersPerPage,
  totalResultLength,
}) => {
  const pageNumbers = [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(totalResultLength / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((number) => (
        <li key={number} className={styles.paginationItem}>
          <button
            onClick={() => paginate(number)}
            className={
              currentPage == number
                ? styles['selected']
                : styles.paginationButton
            }>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
