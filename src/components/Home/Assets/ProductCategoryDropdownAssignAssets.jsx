import React from "react";

function ProductCategoryDropdown({ prodCategory, selectedproductCategoryId, setSelectedproductCategory }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Product Category</label>
      <select
        className="form-control"
        value={selectedproductCategoryId}
        onChange={(e) =>
          setSelectedproductCategory(e.target.value)
        }
      >
        <option value="">--Choose a product Category--</option>

        {Array.isArray(prodCategory) ? (
          prodCategory.map((prodCategory) => (
            <option key={prodCategory.id} value={prodCategory.id}>
              {prodCategory.category_name}
            </option>
          ))
        ) : (
          <p>no data found</p>
        )}
      </select>
    </div>
  );
}

export default ProductCategoryDropdown;
