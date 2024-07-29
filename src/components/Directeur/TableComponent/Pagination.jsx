import React, { useState } from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [requestsPerPage] = useState(5);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`px-3 py-1 mx-1 rounded ${currentPage === number ? 'bg-bleu-fonce text-white' : 'bg-gray-200'}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
}

export default Pagination;
