import React from "react";

function ProductDropdown({ product, selectedproductId, setSelectedproductId }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Product</label>
      <select
        className="form-control"
        value={selectedproductId}
        onChange={(e) =>
          setSelectedproductId(parseInt(e.target.value, 10))
        }
      >
        <option value="">--Choose a product--</option>
        {Array.isArray(product) ? (
          product.map((product) => (
            <option key={product.id} value={product.id}>
              {product.product_name}
            </option>
          ))
        ) : (
          <p>no data found</p>
        )}
      </select>
    </div>
  );
}

export default ProductDropdown;