import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./assetadd.css";
import AssetForm from "./AssetForm"; // Make sure to import AssetForm from the correct path
import Swal from 'sweetalert2';

const AssetAdd = ({ sidebarOpen }) => {
  const [assets, setAssets] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState();
  const [assetName, setAssetName] = useState("");
  const [price, setPrice] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState();
  const [purchaseTypes, setPurchaseTypes] = useState([]);
  const [selectedPurchaseType, setSelectedPurchaseType] = useState();
  const [description, setDescription] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const navigate = useNavigate();

  const fetchData = async (url, stateSetter) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      stateSetter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("http://127.0.0.1:3001/api/v1/productcategories", setProductCategories);
    fetchData("http://127.0.0.1:3001/api/v1/products", setProducts);
    fetchData("http://127.0.0.1:3001/api/v1/producttype", setProductTypes);
    fetchData("http://127.0.0.1:3001/api/v1/locations", setLocations);
    fetchData("http://127.0.0.1:3001/api/v1/purchase_types", setPurchaseTypes);
    fetchData("http://127.0.0.1:3001/api/v1/vendors", setVendors);
  }, []);

  const postData = async (e) => {
    if (!selectedProductCategory || !selectedProductType || !selectedProduct || !selectedVendor || !assetName || !price || !selectedLocation || !purchaseDate || !description) {
      Swal.fire({
        title: 'All Fields are Required',
      })
      return;
    }
    e.preventDefault();
    const formData = {
      product_category_id: selectedProductCategory,
      product_type_id: selectedProductType,
      product_id: selectedProduct,
      vendor_id: selectedVendor,
      asset_name: assetName,
      price: price,
      location_id: selectedLocation,
      purchase_id: purchaseDate,
      warranty_expiry_date: warrantyExpiryDate, 
      purchase_type_id: selectedPurchaseType,
      description: description,
      serial_number: serial_number,
      asset_specification_id: 'b2a6c688-70eb-4499-96f1-69aaf603b404'
    };
    
    try {
      const response = await fetch("http://127.0.0.1:3001/api/v1/asset",  {
        method: "POST",
        body: JSON.stringify({ asset: formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error adding asset");
      }

      const data = await response.json();
      setAssets([...assets, data]);
      Swal.fire({
       icon: 'success',
        title: 'Successfully Added',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      navigate('/Home/Addlist');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <div className="container-1">
          <h3>
            <b>Add Asset</b>
          </h3>
          <hr />
          <AssetForm
          mode="add"
            productCategories={productCategories}
            selectedProductCategory={selectedProductCategory}
            setSelectedProductCategory={setSelectedProductCategory}
            productTypes={productTypes}
            selectedProductType={selectedProductType}
            setSelectedProductType={setSelectedProductType}
            products={products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            vendors={vendors}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            assetName={assetName}
            setAssetName={setAssetName}
            price={price}
            setPrice={setPrice}
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            purchaseDate={purchaseDate}
            setPurchaseDate={setPurchaseDate}
            warrantyExpiryDate={warrantyExpiryDate}
            setWarrantyExpiryDate={setWarrantyExpiryDate}
            purchaseTypes={purchaseTypes}
            selectedPurchaseType={selectedPurchaseType}
            setSelectedPurchaseType={setSelectedPurchaseType}
            description={description}
            setDescription={setDescription}
            serial_number={serial_number}
            setSerialNumber={setSerialNumber}
            postData={postData}
          />
        </div>
      </div>
    </>
  );
};

export default AssetAdd;