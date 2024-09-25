import React from "react";
import "./Assign.css"
const AssignAssetPagination = ({
  currentPage,
  pageCount,
  handlePageChange,
  filteredAssignAssets,
  itemsPerPage,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRangeStart = indexOfFirstItem + 1;
  const currentRangeEnd = Math.min(indexOfLastItem, filteredAssignAssets.length);


  return (
    <div className="col-sm-12 col-md-7 ">
      <div className="row mt-3">
        <div className="col-sm-12 col-md-5">
          <div
            className="dataTables_info"
            id="DataTables_Table_3_info"
            role="status"
            aria-live="polite"
          >
            Showing {currentRangeStart} to {currentRangeEnd} of {filteredAssignAssets.length} entries
          </div>
        </div>
        <div className="col-sm-12 col-md-7 ">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({
                length: Math.ceil(filteredAssignAssets.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage ===
                  Math.ceil(filteredAssignAssets.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredAssignAssets.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AssignAssetPagination;