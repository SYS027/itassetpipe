import React, { useEffect, useState } from "react";
import "../Location/AddLocation.css";
import { Link } from "react-router-dom";
import AddForm from "./AddForm";
import AddFormDataFetch from "./AddFormDataFetch";

const AddLocation = ({ sidebarOpen }) => {
  const [location, setLocation] = useState([]);
  const [office_name, setOffice_name] = useState("");
  const [poc_email, setPoc_email] = useState("");
  const [poc_contact, setPoc_contact] = useState("");
  const [poc_name, setPoc_name] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zip_code, setZip_code] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);

  const url = "http://127.0.0.1:3000/api/v1/locations";

  useEffect(() => {
    const areFieldsFilled =
      office_name !== "" &&
      poc_email !== "" &&
      poc_contact !== "" &&
      poc_name !== "" &&
      zip_code !== "" &&
      selectedCountry &&
      selectedState &&
      selectedCity;
    setAllFieldsFilled(areFieldsFilled);
  }, [
    office_name,
    poc_email,
    poc_contact,
    poc_name,
    zip_code,
    selectedCountry,
    selectedState,
    selectedCity,
  ]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
    setPoc_email(email);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const phoneRegex = /^[\d+]*$/;
    setIsValidPhone(phoneRegex.test(phone));
    setPoc_contact(phone);
  };

  const handleFormSubmit = () => {
    const formData = {
      office_name: office_name,
      poc_email: poc_email,
      poc_contact: poc_contact,
      poc_name: poc_name,
      zip_code: zip_code,
      country_id: selectedCountry,
      state_id: selectedState,
      city_id: selectedCity,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ location: formData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        window.location.href = "/location";
        return response.json();
      })
      .then(() => {
        setLocation([...location, formData]);
        setOffice_name("");
        setPoc_email("");
        setPoc_contact("");
        setPoc_name("");
        setZip_code("");
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
      })
      .catch((error) => {});
  };

  return (
    <>
      <main
        id="main"
        className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
      >
        <div className="container-fluid" id="add-mainLocation">
          <div className="card" id="add-main">
            <section>
              <AddFormDataFetch
                setCountries={setCountries}
                setStates={setStates}
                setCities={setCities}
              />
              <AddForm
                countries={countries}
                states={states}
                cities={cities}
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                selectedCity={selectedCity}
                setSelectedCountry={setSelectedCountry}
                setSelectedState={setSelectedState}
                setSelectedCity={setSelectedCity}
                handleFormSubmit={handleFormSubmit}
                handleEmailChange={handleEmailChange}
                handlePhoneChange={handlePhoneChange}
                office_name={office_name}
                setOffice_name={setOffice_name}
                poc_email={poc_email}
                setPoc_email={setPoc_email}
                poc_contact={poc_contact}
                setPoc_contact={setPoc_contact}
                poc_name={poc_name}
                setPoc_name={setPoc_name}
                zip_code={zip_code}
                setZip_code={setZip_code}
                isValidEmail={isValidEmail}
                isValidPhone={isValidPhone}
                allFieldsFilled={allFieldsFilled}
              />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddLocation;
