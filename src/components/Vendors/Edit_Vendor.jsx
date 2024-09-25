import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Edit_Form from './Edit_Form';
import CountrySelect from "../../countryDetails/Country";
import StateSelect from '../../countryDetails/State';
import CitySelect from "../../countryDetails/City";

const Edit_Vendor = () => {
  const {
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
  } = Edit_Form();

  const navigate = useNavigate();
  const params = useParams();

  return (
    <main id="main" className="main">
      <section className="section">
        <div className="popup">
          <header className="wid">
            <p className="addhead">Edit Vendor</p>
          </header>
          <div id="data">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="#">Vendor</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  value={vendor_name}
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="#">Email</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="#">Phone</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="#">Country</label>
                <CountrySelect onSelectCountry={setSelectedCountry} />
              </div>
              <div className="col-md-6">
                <label htmlFor="#">State</label>
                <StateSelect
                    selectedCountryId={selectedCountry}
                    onSelectState={setSelectedState}
                  />
              </div>
              <div className="col-md-6">
                <label htmlFor="#">City</label>
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
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="#">Address</label>
                <br />
                <textarea rows="2" cols="10"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="#">Description</label>
                <br />
                <textarea rows="2" cols="10"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
              </div>
            </div>
            <div className="bton">
              <Link to='/vendor'>
                <button className="btn btn-dark mx-2">Close</button>
              </Link>
              <button className="btn btn-dark" onClick={updateVendor}>
                Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Edit_Vendor;