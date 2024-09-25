import React from "react";

const Product_thead = () => {
  return (
    <>
      <thead>
        <tr role="row" className="lightblue">
          <th className="dt-body-center sorting_disabled">
            <div className="dt-checkbox">
              <input type="checkbox" value="1" />
              <span className="dt-checkbox-label"></span>
            </div>
          </th>
          <th className="sorting_desc">S.No</th>
          <th className="sorting">Product Name</th>
          <th className="sorting">Product Type</th>
          <th className="sorting">Products Category</th>
          <th className="sorting">Status</th>
          <th className="sorting">Action</th>
        </tr>
      </thead>
    </>
  );
};

export default Product_thead;
