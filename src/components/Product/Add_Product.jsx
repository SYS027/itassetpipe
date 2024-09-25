import React, { useState, useEffect } from "react";
import "./Add_Product.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Add_Product = ({ sidebarOpen }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/api/v1/producttype"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductTypes(data);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };
    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/api/v1/productcategories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductCategories(data);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };
    fetchProductCategories();
  }, []);

  const handleProductCategoryChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Product Category:", selectedValue);
    setProductCategory(selectedValue);
  };
  
  const handleProductTypeChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Product Type:", selectedValue);
    setProductType(selectedValue);
  };
  

  const postData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/api/v1/product/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_category_id: productCategory,
            product_type_id: productType,
            product_name: productName,
            manufacturer: manufacturer,
            company_id: 1,
            is_active: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/Product");
    } catch (error) {
      Swal.fire({
        title: "Failed to submit data. Please try again later.",
      });
    }
  };

  return (
    <>
      <main
        id="main"
        className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
      >
        <div className="card" id="main-product">
          <div id="product">
            <p className="addhead">Add New Product</p>
            <form>
              <div id="data">
                <div>
                  <label>
                    Product Category<span style={{ color: "red" }}> *</span>
                  </label>
                  <br />
                  <select
                    className="form-control"
                    value={productCategory}
                    onChange={handleProductCategoryChange}
                  >
                    <option value="">--Choose a Category--</option>
                    {productCategories.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>
                    Product Type<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    className="form-control"
                    value={productType}
                    onChange={handleProductTypeChange}
                  >
                    <option value="">--Choose a Product Type--</option>
                    {productTypes.map((productType) => (
                      <option key={productType.id} value={productType.id}>
                        {productType.product_type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>
                    Product Name<span style={{ color: "red" }}> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div>
                  <label>
                    Manufacturer<span style={{ color: "red" }}> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Link to="/product" type="button" className="btn btn-dark">
                    Close
                  </Link>
                  <button type="button" className="button" onClick={postData}>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Add_Product;
