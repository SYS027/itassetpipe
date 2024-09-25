import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CountrySelect from "../../../countryDetails/Country";
import StateSelect from '../../../countryDetails/State';
import CitySelect from "../../../countryDetails/City";

const LocationForm = ({
    countries,
    states,
    cities,
    selectedCountry, // This is a prop, no need to declare it as local state
    selectedState,   // This is a prop, no need to declare it as local state
    selectedCity,    // This is a prop, no need to declare it as local state
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    handleFormSubmit,
    handleEmailChange,
    handlePhoneChange,
    office_name,
    setOffice_name,
    poc_email,
    setPoc_email,
    poc_contact,
    setPoc_contact,
    poc_name,
    setPoc_name,
    zip_code,
    setZip_code,
    isValidEmail,
    isValidPhone,
    allFieldsFilled,
}) => {
    const handleAlert = () => {
        Swal.fire({
            title: "Submitted successfully"
        });
    };
    return (
        <div className="popup">
            <header className="wid" id="main-heads">
                <p className="addhead">Add New Location</p>
            </header>
            <div id="data">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="#">Office name</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            value={office_name}
                            onChange={(e) => setOffice_name(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="#">Address line 1</label>
                        <br />
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="#">Address line 2</label>
                        <br />
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label>Country<span style={{ color: "red" }}> *</span></label>
                        <CountrySelect onSelectCountry={setSelectedCountry} />
                    </div>
                    <div className="col-md-6">
                        <label>State/Province</label>
                        <StateSelect
                            selectedCountryId={selectedCountry}
                            onSelectState={setSelectedState}
                        />
                    </div>
                    <div className="col-md-6">
                        <label>City<span style={{ color: "red" }}> *</span></label>
                        <CitySelect
                            selectedCountryId={selectedCountry}
                            selectedStateId={selectedState}
                            onSelectCity={setSelectedCity}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="#">Zip code</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            value={zip_code}
                            onChange={(e) => setZip_code(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="#">Contact person name</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            value={poc_name}
                            onChange={(e) => setPoc_name(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="#">Contact person email</label>
                        <br />
                        <input
                            type="text"
                            className={`form-control ${isValidEmail ? "" : "invalid"}`}
                            value={poc_email}
                            onChange={handleEmailChange}
                        />
                        {!isValidEmail && (
                            <p className="error">Invalid email format</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="#">Contact person phone</label>
                        <br />
                        <input
                            type="text"
                            className={`form-control ${isValidPhone ? "" : "invalid"}`}
                            value={poc_contact}
                            onChange={handlePhoneChange}
                        />
                        {!isValidPhone && (
                            <p className="error">Invalid phone number format</p>
                        )}
                    </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                    <input className="mt-1" type="checkbox" />
                    <label>Make this your default location</label>
                    <br />
                    <button className='btn btn-primary'
                        onClick={() => {
                            handleFormSubmit();
                            handleAlert();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div >
    );
};
export default LocationForm;
