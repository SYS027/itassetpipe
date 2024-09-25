import React from "react";
import { Link } from "react-router-dom";

const DepartmentList = ({
  data,
  handleDelete,
  handleStatusToggle,
  searchQuery,
  setSearchQuery
}) => {
  const filterData = () => {
    return data.filter(
      (item) =>
        item.department_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.contact_person_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.contact_person_email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.contact_person_phone.includes(searchQuery)
    );
  };

  return (
    <div>
      <div
        className="col-sm-6 col-md-4 col-12"
        style={{ float: "right", justifySelf: "end", marginLeft: "18rem" }}
      >
        <div className="input-group rounded blue">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text border-0 blue" id="search-addon">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-md-12" style={{ display: "flex" }}>
          <span className="entry_show">Show</span>
          <select
            name="DataTables_Table_3_length"
            aria-controls="DataTables_Table_3"
            className="custom-select custom-select-sm form-control form-control-sm"
            style={{ width: "auto" }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={-1}>All</option>
          </select>
          <span className="entry_show">entries</span>
        </div>
      </div>
      <div
        id="DataTables_Table_3_wrapper"
        className="dataTables_wrapper dt-bootstrap4 no-footer"
      >
        <div className="row row1">
          <div className="col-sm-12">
            <table
              className="checkbox-datatable table nowrap dataTable no-footer dtr-inline"
              id="DataTables_Table_3"
              role="grid"
              aria-describedby="DataTables_Table_3_info"
            >
              <thead>
                <tr role="row" className="lightblue" id="tablehead-department">
                  <th>
                    {" "}
                    <input
                      type="checkbox"
                      name="select_all"
                      defaultValue={1}
                      id="example-select-all"
                    />
                  </th>
                  <th className="sorting_desc"> S.No </th>
                  <th
                    className="sorting"
                    aria-label="Position: activate to sort column ascending"
                  >
                    Department Name
                  </th>
                  <th
                    className="sorting"
                    aria-label="Office: activate to sort column ascending"
                  >
                    Contact Person Name
                  </th>
                  <th className="sorting"> Contact Person Email </th>
                  <th
                    className="sorting"
                    aria-label="Start date: activate to sort column ascending"
                  >
                    Contact Person Phone
                  </th>
                  <th
                    className="sorting"
                    aria-label="Salary: activate to sort column ascending"
                  >
                    Status
                  </th>
                  <th
                    className="sorting"
                    aria-label="Salary: activate to sort column ascending"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterData().length > 0 ? (
                  filterData().map((item, index) => (
                    <tr key={item.id} role="row" className="odd">
                      <td className=" dt-body-center" tabIndex={0}>
                        <div className="dt-checkbox">
                          <input type="checkbox" name="id[]" defaultValue />
                          <span className="dt-checkbox-label" />
                        </div>
                      </td>
                      <td>{index + 1}</td>
                      <td className> {item.department_name}</td>
                      <td>{item.contact_person_name}</td>
                      <td>{item.contact_person_email}</td>
                      <td>{item.contact_person_phone}</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`flexSwitchCheckChecked-${item.id}`}
                            defaultChecked={item.status}
                            onChange={(e) =>
                              handleStatusToggle(item.id, e.target.checked)
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div
                          className="d-flex justify-content-between"
                          style={{ color: "#0d6efd" }}
                        >
                          <Link to={`/edit/${item.id}`}>
                            {" "}
                            <i className="fa-solid fa-pen-to-square" />{" "}
                          </Link>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DepartmentList;
