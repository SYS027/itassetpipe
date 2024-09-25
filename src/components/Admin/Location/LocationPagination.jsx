import React from "react";

const LocationPagination = ({
  currentPage,
  itemsPerPage,
  filterLocations,
  paginate,
}) => {
  return (
    <div className="row mt-3">
      <div className="col-sm-12 col-md-7 ">
      <nav
                  aria-label="Page navigation example"
                  className="paginationpage"
                >
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </button>
                    </li>
                    {Array.from(
                      {
                        length: Math.ceil(
                          filterLocations.length / itemsPerPage
                        ),
                      },
                      (_, i) => (
                        <li
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                          key={i + 1}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(filterLocations.length / itemsPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </button>
                    </li>
                  </ul>
                </nav>
      </div>
    </div>
  );
};

export default LocationPagination;