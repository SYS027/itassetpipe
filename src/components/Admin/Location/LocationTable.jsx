import React from "react";
import { Link } from "react-router-dom";

const LocationTable = ({
  currentItems,
  updateStatus,
  handleDelete,
  // ... other props
}) => {
  return (
    <div className="col-sm-12">
      <table
        className="checkbox-datatable table nowrap dataTable no-footer dtr-inline"
        id="DataTables_Table_3"
        role="grid"
        aria-describedby="DataTables_Table_3_info"
      >
        <thead>
          <tr role="row" className="lightblue">
            <th
              className="dt-body-center sorting_disabled"
              rowSpan={1}
              colSpan={1}
              aria-label=""
            >
              <div className="dt-checkbox">
                <input
                  type="checkbox"
                  name="select_all"
                  defaultValue={1}
                  id="example-select-all"
                />
                <span className="dt-checkbox-label" />
              </div>
            </th>
            <th
              className="sorting_desc "
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Name: activate to sort column ascending"
              aria-sort="descending"
            >
              S.No
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Position: activate to sort column ascending"
            >
              Office Name
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Office: activate to sort column ascending"
            >
              Contact Person Name
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Start date: activate to sort column ascending"
            >
              State
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Start date: activate to sort column ascending"
            >
              City
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Start date: activate to sort column ascending"
            >
              Zip Code
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Salary: activate to sort column ascending"
            >
              Status
            </th>
            <th
              className="sorting"
              tabIndex={0}
              aria-controls="DataTables_Table_3"
              rowSpan={1}
              colSpan={1}
              aria-label="Salary: activate to sort column ascending"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr role="row" className="odd" key={item.id}>
              <td className=" dt-body-center" tabIndex={0}>
                <div className="dt-checkbox">
                  <input type="checkbox" name="id[]" defaultValue />
                  <span className="dt-checkbox-label" />
                </div>
              </td>
              <td className="sorting_1">{index + 1}</td>{" "}
              {/* Add 1 to index to display 1-based numbering */}
              <td>{item.office_name}</td>
              <td>{item.poc_name}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>{item.zip_code}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={"status"}
                    onClick={(e) => (e, item.id)}
                    id={`flexSwitchCheckChecked-${item.id}`}
                    defaultChecked={item.is_active}
                    onChange={(e) => updateStatus(item.id, e.target.checked)}
                  />
                </div>
              </td>
              <td>
                <div className="editicon">
                  <Link to={`/location/edit/${item.id}`}>
                    <i className="fa-solid fa-pen-to-square" />
                  </Link>
                  &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                    onClick={() => handleDelete(item.id)}
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
    </div>
  );
};

export default LocationTable;
