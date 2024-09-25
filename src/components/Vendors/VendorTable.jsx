import React from "react";
import { Link } from "react-router-dom";


const VendorTable = ({
  currentEntries,
  selectedVendors,
  handleCheckboxChange,
  handleToggle,
  handleDelete,
  getContinuousIndex,
}) => {
  return (
    <table
      className="checkbox-datatable table nowrap dataTable no-footer dtr-inline "
      id="DataTables_Table_3"
      role="grid"
      aria-describedby="DataTables_Table_3_info"
    >
      <thead className="text-center">
        <tr role="row" className="lightblue">
          <th></th>
          <th>S.No</th>
          <th>Vendor Name</th>
          <th>Contact person</th>
          <th>Email</th>
          <th>GSTIN No.</th>
          <th>Phone no</th>
          <th>Current Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="text-center" id="vendor-tbody">
        {currentEntries.map((vendor, index) => (
          <tr role="row" className="odd" key={vendor.id}>
            <td className=" dt-body-center">
              <div className="dt-checkbox">
                <input
                  type="checkbox"
                  name="id[]"
                  defaultValue=""
                  value={vendor.id}
                  checked={selectedVendors.includes(vendor.id)}
                  onChange={() => handleCheckboxChange(vendor.id)}
                />
                <span className="dt-checkbox-label" />
              </div>
            </td>
            <td className="sorting_1 text-center">
              {getContinuousIndex(index)}
            </td>
            <td className="text-center">{vendor.vendor_name}</td>
            <td className="text-center">N/A</td>
            <td className="text-center">{vendor.email}</td>
            <td className="text-center">N/A</td>
            <td className="text-center">{vendor.phone_number}</td>
            <td className="text-center">
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={vendor.is_active}
                  id={`flexSwitchCheckChecked-${vendor.id}`}
                  onChange={() => handleToggle(vendor.id, !vendor.is_active)}
                />
              </div>
            </td>
            <td>
              <div style={{ color: "#0d6efd" }} className="text-center">
                <Link to={`/vendordetails/${vendor.id}`}>
                  <i className="fa fa-eye ey1" />
                </Link>
                <Link to={`/editvendor/${vendor.id}`}>
                  <i className="fa fa-edit mt-2" />
                </Link>
                &nbsp;
                <button onClick={() => handleDelete(vendor.id)}>
                  <i className="fa fa-trash" id="trash-vendor" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VendorTable;
