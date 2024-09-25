import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AssetForm from './AssetForm'; 
const EditAsset = ({ sidebarOpen }) => {
  const [productCategories, setProductCategories] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState();
const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState();
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
  const [id, setId] = useState("")

  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataFunction(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("http://127.0.0.1:3001/api/v1/productcategories", setProductCategories);
    fetchData("http://127.0.0.1:3001/api/v1/producttype", setProductTypes);
    fetchData("http://127.0.0.1:3001/api/v1/locations", setLocations);
    fetchData("http://127.0.0.1:3001/api/v1/products", setProducts);
    fetchData("http://127.0.0.1:3001/api/v1/purchase_types", setPurchaseTypes);
    fetchData("http://127.0.0.1:3001/api/v1/vendors", setVendors);
    fetchData(`http://127.0.0.1:3001/api/v1/asset/${params.id}`, setAssetData);
  }, [params.id]);

  const setAssetData = (assetData) => {
    setId(assetData.id);
    setAssetName(assetData.asset_name);
    setDescription(assetData.description);
    setPrice(assetData.price);
    setSelectedLocation(assetData.location_id);
    setSelectedProduct(assetData.product_id);
    setSelectedProductCategory(assetData.product_category_id);
    setSelectedProductType(assetData.product_type_id);
    setSelectedPurchaseType(assetData.purchase_type_id);
    setSelectedVendor(assetData.vendor_id);
    setWarrantyExpiryDate(assetData.warranty_expiry_date);
    setPurchaseDate(assetData.purchase_id);
    setSerialNumber(assetData.serial_number);
  };

  const updateData = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:3001/api/v1/asset/${id}`;
    const data = {
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
      serial_number: serial_number
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      console.log("Asset updated successfully");
      navigate('/home/addlist');
    } catch (error) {
      console.error("Error updating asset data:", error);
    }
  };
  return (
    <>
      <div id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <div className="container-1">
          <h3>
            <b>Edit Asset</b>
          </h3>
          <hr />
          <AssetForm
            mode="edit"
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
            updateData={updateData}
          />
        </div>
      </div>
    </>
  );
};
export default EditAsset;