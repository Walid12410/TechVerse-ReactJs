const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex space-x-2">
          {pageNumbers.map(page => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className="px-4 py-2 border rounded text-sm"
                style={{
                  backgroundColor: currentPage === page ? 'var(--color-purple)' : '#fff',
                  color: currentPage === page ? '#fff' : '#333',
                  borderColor: 'var(--color-navy-medium)',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.target.style.backgroundColor = 'var(--color-purple)';
                    e.target.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#333';
                  }
                }}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
