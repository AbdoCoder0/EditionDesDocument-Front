import React from 'react';
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 3;

  const handleClick = (page) => {
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    let startPage, endPage;
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="mt-4 flex justify-center items-center">
      <button
        className={`px-2 py-1 mx-1 rounded bg-gray-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <MdArrowBackIos />
      </button>
      {renderPageNumbers().map(number => (
        <button
          key={number}
          className={`px-3 py-1 mx-1 rounded ${currentPage === number ? 'bg-bleu-fonce text-white' : 'bg-gray-200'}`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`px-2 py-1 mx-1 rounded bg-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
}

export default Pagination;
