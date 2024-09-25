import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const Edit_Form = () => {
  const [vendor, setVendors] = useState([]);
  const [vendardata, setVendorData]= useState([]);
  const [vendor_name, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zip_code, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData("http://127.0.0.1:3001/api/v1/countries", setCountries);
    fetchData("http://127.0.0.1:3001/api/v1/states", setStates);
    fetchData("http://127.0.0.1:3001/api/v1/cities", setCities);
    fetchData(`http://127.0.0.1:3001/api/v1/vendors/${params.id}`, setVendorData);
  }, [params.id]);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/v1/vendors");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/v1/vendors/${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const vendorData = await response.json();
        setVendors(vendorData)
        setVendorName(vendorData.vendor_name);
        setEmail(vendorData.email);
        setPhoneNumber(vendorData.phone_number);
        setSelectedCountry(vendorData.country_id);
        setSelectedState(vendorData.state_id);
        setSelectedCity(vendorData.city_id);
        setZipCode(vendorData.zip_code);
        setAddress(vendorData.address);
        setDescription(vendorData.description);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, [params.id]);

  const updateVendor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:3001/api/v1/vendors/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendor_name: vendor_name,
          email: email,
          phone_number: phone_number,
          country_id: selectedCountry,
          state_id: selectedState,
          city_id: selectedCity,
          zip_code: zip_code,
          address: address,
          description: description,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      console.log("vendor updated successfully");
      navigate("/vendor");
    } catch (error) {
      console.error("Error updating vendor data:", error);
    }
  };

  return {
    vendor_name,
    setVendorName,
    email,
    setEmail,
    phone_number,
    setPhoneNumber,
    countries,
    states,
    cities,
    zip_code,
    setZipCode,
    address,
    setAddress,
    description,
    setDescription,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    updateVendor
  };
};

export default Edit_Form;