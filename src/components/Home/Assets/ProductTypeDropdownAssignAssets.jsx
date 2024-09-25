import React from "react";

function ProductTypeDropdown({ productType, selectedproductTypeId, setSelectedproductTypeId }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Product type</label>
      <select
        className="form-control"
        value={selectedproductTypeId}
        onChange={(e) => setSelectedproductTypeId(e.target.value)}
      >
        <option value="">--Choose a product--</option>
        {Array.isArray(productType) ? (
          productType.map((productType) => (
            <option key={productType.id} value={productType.id}>
              {productType.product_type}
            </option>
          ))
        ) : (
          <p>no data found</p>
        )}
      </select>
    </div>
  );
}

export default ProductTypeDropdown;
