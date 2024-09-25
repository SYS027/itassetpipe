import React from "react";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <div className="row mt-3">
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="DataTables_Table_3_info"
          role="status"
          aria-live="polite"
        >
          {""}
          1-10 of entries {""}
        </div>
      </div>
      <div className="col-sm-12 col-md-7 ">
        <nav aria-label="Page navigation example" style={{ float: "right" }}>
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span className="sr-only">Previous</span>
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#">
                {" "}
                1{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#">
                {" "}
                2{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#">
                {" "}
                3{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
                <span className="sr-only">Next</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
