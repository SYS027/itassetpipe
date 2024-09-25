import React from "react";
import "../Vendors/Add_Vendor.css";
import { Link } from "react-router-dom";
import CountrySelect from "../../countryDetails/Country";
import StateSelect from '../../countryDetails/State';
import CitySelect from "../../countryDetails/City";

const Vendor_Form = ({
  vendor_name,
  setVendorName,
  email,
  setEmail,
  phone_number,
  setPhoneNumber,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  zip_code,
  setZipCode,
  address,
  setAddress,
  description,
  setDescription,
  handleSubmit,
}) => {
  return (
    <div className="popup">
      <header className="wid">
        <p className="addhead">Add New Vendor</p>
      </header>
      <div id="data">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="#" className="form-label">
              Vendor<span style={{ color: "red" }}> *</span>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              value={vendor_name}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Email<span style={{ color: "red" }}> *</span></label>
            <br />
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Phone<span style={{ color: "red" }}> *</span></label>
            <br />
            <input
              type="text"
              className="form-control"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col-md-6">
          <label>Country<span style={{ color: "red" }}> *</span></label>
                  <CountrySelect onSelectCountry={setSelectedCountry} />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">State<span style={{ color: "red" }}> *</span></label>
            <StateSelect
                    selectedCountryId={selectedCountry}
                    onSelectState={setSelectedState}
                  />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">City<span style={{ color: "red" }}> *</span></label>
            <CitySelect
                    selectedCountryId={selectedCountry}
                    selectedStateId={selectedState}
                    onSelectCity={setSelectedCity}
                  />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Zip code<span style={{ color: "red" }}> *</span></label>
            <br />
            <input
              type="text"
              className="form-control"
              value={zip_code}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Address<span style={{ color: "red" }}> *</span></label>
            <br />
            <textarea rows="2" cols="10"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              ></textarea>
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Description<span style={{ color: "red" }}> *</span></label>
            <br />
            <textarea rows="2" cols="20"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ></textarea>
          </div>
        </div>
        <div className="bton">
          <Link to="/vendor"> <button className="btn btn-dark mx-2" >Close</button></Link>
          <button className="btn btn-dark" type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vendor_Form;
