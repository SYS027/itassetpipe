import React, { useState } from "react";
import { Link } from "react-router-dom";
import Deletedata from "../Delete/Deletedata";

const ProductButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="title">
            <h3 className="m-3">PRODUCTS</h3>
          </div>
        </div>
        <hr />
      </div>

      <div className="row">
        <div className="col-md-12 d-flex gap-2">
          <button className="btn-vendor">
            <Link to="/addproduct" className="btn btn-primary" id="addproduct">{" "}
              Add Product +
            </Link>
          </button>
          <button className="btn-vendor">
            <Link to="#" className="btn btn-dark" id="product_export">
              Export
            </Link>
          </button>
          <button className="btn-vendor">
            <Link to="#" id="delete_product"  onClick={() => {
          setModalOpen(true);
        }} className="btn btn-primary">
              Delete 
            </Link>
          </button>
            {modalOpen  && <Deletedata setOpenModal={setModalOpen}/>}
        </div>
      </div>
    </>
  );
};

export default ProductButton;
