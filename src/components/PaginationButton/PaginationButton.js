import React from "react";

export default function PaginationButton({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={handleFirstPage}
          className="px-4 py-2 mx-1 rounded text-white"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="dots-start">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 mx-1 rounded text-white ${
            currentPage === i
              ? "bg-blue-800 cursor-default"
              : "hover:bg-blue-700 transition-all duration-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="dots-end">...</span>);
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={handleLastPage}
          className="px-4 py-2 mx-1 rounded text-white"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8">
      {currentPage !== 1 ? (
        <button
          className={`px-4 py-2 mx-2 transition-all duration-300 text-white rounded hover:bg-blue-700`}
          onClick={handlePreviousPage}
        >
          Prev
        </button>
      ) : null}
      {renderPageNumbers()}
      {currentPage !== totalPages ? (
        <button
          className={`px-4 py-2 mx-2 transition-all duration-300 text-white rounded hover:bg-blue-700`}
          onClick={handleNextPage}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}
