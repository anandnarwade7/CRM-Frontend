import React from "react";

const UserPagination = ({
  handlePreviousPage,
  handleNextPage,
  page,
  totalPages,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserPagination;
