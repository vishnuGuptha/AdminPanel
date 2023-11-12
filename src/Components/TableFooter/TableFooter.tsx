// TableFooter.tsx
import React from "react";
import "./TableFooter.css";

interface TableFooterProps {
  handleDeleteSelected: () => void;
  selectedRows: number[];
  pageCount: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const TableFooter: React.FC<TableFooterProps> = ({
  handleDeleteSelected,
  selectedRows,
  pageCount,
  setCurrentPage,
  currentPage,
}) => (
  <div className="--table-footer-container">
    <button
      className={"--delete-selected-btn"}
      onClick={handleDeleteSelected}
      disabled={selectedRows.length <= 0}
    >
      Delete Selected
    </button>
    {pageCount > 1 && (
      <div className="--pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index + 1}
            className={index + 1 == currentPage ? "--current-page" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage(pageCount)}
        >
          Last
        </button>
      </div>
    )}
  </div>
);

export default TableFooter;
