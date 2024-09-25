import React from "react";
import { Link } from "react-router-dom";
import CountrySelect from "../../../countryDetails/Country";
import StateSelect from '../../../countryDetails/State';
import CitySelect from "../../../countryDetails/City";

const LocationForm = ({
  office_name,
  setOffice_name,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  countries,
  states,
  cities,
  zip_code,
  setZip_code,
  poc_name,
  setPoc_name,
  poc_email,
  setPoc_email,
  poc_contact,
  setPoc_contact,
  updateLocation,
}) => {
  return (
    <div className="popup">
      <header className="wid" id="main-heads">
        <p className="addhead">Edit Location</p>
      </header>
      <div id="data">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="#">Office name</label>
            <br />
            <input type="text" className="form-control" value={office_name} onChange={(e) => setOffice_name(e.target.value)} />
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
            <label>
              Country<span className="asterisk"> *</span>
            </label>
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
            <input type="text" className="form-control" value={zip_code} onChange={(e) => setZip_code(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Contact person name</label>
            <br />
            <input type="text" className="form-control" value={poc_name} onChange={(e) => setPoc_name(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Contact person email</label>
            <br />
            <input type="text" className="form-control" value={poc_email} onChange={(e) => setPoc_email(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="#">Contact person phone</label>
            <br />
            <input type="text" className="form-control" value={poc_contact} onChange={(e) => setPoc_contact(e.target.value)}
            />
          </div>
        </div>
        <input type="checkbox" />
        <label>Make this your default location</label>
        <br />
        <Link to="/Location" className="btn btn-dark m-2">
          Close
        </Link>
        <button className="button" onClick={updateLocation}>
          Update
        </button>
      </div>
    </div>
  );
};

export default LocationForm;
