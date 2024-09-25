import React from "react";

function VendorDropdown({ vendor, selectedVendorId, setSelectedVendorId }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Vendor</label>
      <select
        className="form-control"
        value={selectedVendorId}
        onChange={(e) =>
          setSelectedVendorId(parseInt(e.target.value, 10))
        }
      >
        <option value="">--Choose a Vendor--</option>
        {Array.isArray(vendor) ? (
          vendor.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.vendor_name}
            </option>
          ))
        ) : (
          <p>no data found</p>
        )}
      </select>
    </div>
  );
}

export default VendorDropdown;