import React from "react";

const ProductEntityshow = () => {
  return (
    <>
      <div className="row pt-3">
        <div className="col-md-12" id="show-product">
          <span className="entry_show">Show</span>
          <select className="custom-select custom-select-sm 
            form-control form-control-sm" id="selectAll-product">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="-1">All</option>
          </select>
          <span className="entry_show">entries</span>
        </div>
      </div>
    </>
  );
};

export default ProductEntityshow;
