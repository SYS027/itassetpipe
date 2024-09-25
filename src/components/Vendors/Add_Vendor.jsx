import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Vender_Form from "./Vendor_Form";
import "../Vendors/Add_Vendor.css";
import Swal from 'sweetalert2';

const Add_Vendor = () => {
  const [vendors, setVendors] = useState([]);
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (url, setterFunction) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setterFunction(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData("http://127.0.0.1:3001/api/v1/countries", setCountries);
    fetchData("http://127.0.0.1:3001/api/v1/states", setStates);
    fetchData("http://127.0.0.1:3001/api/v1/cities", setCities);
  }, []);

  const handleSubmit = () => {
    if (
      !vendor_name ||
      !email ||
      !phone_number ||
      !selectedCountry ||
      !selectedState ||
      !selectedCity ||
      !zip_code ||
      !address ||
      !description
    ) {
Swal.fire({
  title: 'All Fields are Required',
})
      return;
    }

    const formData = {
      vendor_name: vendor_name,
      email: email,
      phone_number: phone_number,
      country_id: selectedCountry,
      state_id: selectedState,
      city_id: selectedCity,
      zip_code: zip_code,
      address: address,
      description: description,
    };

    fetch("http://127.0.0.1:3001/api/v1/vendors", {
      method: "POST",
      body: JSON.stringify({ vendor: formData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVendors([...vendors, data]);
        setVendorName("");
        setEmail("");
        setPhoneNumber("");
        setSelectedCountry();
        setSelectedState();
        setSelectedCity();
        setZipCode("");
        setAddress("");
        setDescription("");
        navigate("/vendor");
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <main id="main" className="main">
        <section className="section">
          <div className="row">
          <Vender_Form
            countries={countries}
            states={states}
            cities={cities}
            vendor_name={vendor_name}
            setVendorName={setVendorName}
            email={email}
            setEmail={setEmail}
            phone_number={phone_number}
            setPhoneNumber={setPhoneNumber}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            zip_code={zip_code}
            setZipCode={setZipCode}
            address={address}
            setAddress={setAddress}
            description={description}
            setDescription={setDescription}
            formSubmitted={formSubmitted}
            handleSubmit={handleSubmit}
           />
          
          </div>
        </section>
      </main>
    </>
  );
};

export default Add_Vendor;
