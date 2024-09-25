import React from "react";
import { Link } from "react-router-dom";

const AssignAssetTable = ({
  currentAssignAssets,
  selectedItems,
  handleCheckboxChange,
  handleToggle,
  handleDelete,
}) => {
  return (
    <table className="checkbox-datatable table nowrap dataTable no-footer dtr-inline ">
      <thead>
        <tr role="row" className="lightblue">
          <th></th>
          <th>S.No</th>
          <th>Asset name</th>
          <th>Department</th>
          <th>Location</th>
          <th>Assign to</th>
          <th>Vendor</th>
          <th>status</th>
          <th>Assign </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentAssignAssets.map((assign_asset, index) => (
          <tr role="row" className="odd" key={assign_asset.id}>
            <td className=" dt-body-center">
              <div className="dt-checkbox">
                <input
                  type="checkbox"
                  name="id[]"
                  value={assign_asset.id}
                  checked={selectedItems.includes(assign_asset.id)}
                  onChange={() => handleCheckboxChange(assign_asset.id)}
                />
                <span className="dt-checkbox-label" />
              </div>
            </td>
            <td className="sorting_1">{index + 1}</td>
            <td>{assign_asset.asset_name}</td>
            <td>{assign_asset.department_name}</td>
            <td>{assign_asset.address}</td>
            <td>{assign_asset.assign_to}</td>
            <td>{assign_asset.vendor_name}</td>
            <td>
              <button
                className={`btn ${
                  assign_asset.is_active ? "btn-primary" : "btn-secondary"
                }`}
                id={`toggleButton-${assign_asset.id}`}
                onClick={() =>
                  handleToggle(assign_asset.id, !assign_asset.is_active)
                }
              >
                {assign_asset.is_active ? "Active" : "Inactive"}
              </button>
            </td>
            <td>
              {" "}
              <Link to={`/assignedit/${assign_asset.id}`}>
                <button class="btn btn-primary">Resign</button>
              </Link>
            </td>
            <td>
              <div style={{ color: "#0d6efd" }}>
                {" "}
                <Link to={`/assignedit/${assign_asset.id}`}>
                  {" "}
                  <i className="fa fa-edit" />
                </Link>
                &nbsp;
                <button onClick={() => handleDelete(assign_asset.id)}>
                  <i className="fa fa-trash" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssignAssetTable;