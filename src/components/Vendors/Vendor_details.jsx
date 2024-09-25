import React, { useEffect, useState } from "react";
import "./Vendor_details.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const Vendor_details = ({ sidebarOpen, match }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({});
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const url = `http://127.0.0.1:3001/api/v1/vendors/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setVendor(response))
      .catch(() => navigate("/vendor"));
  }, [params.id]);

  useEffect(() => {
    if (vendor.country_id) {
      const countryUrl = `http://127.0.0.1:3001/api/v1/countries/${vendor.country_id}`;
      fetch(countryUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setCountryName(response.country_name))
        .catch(() => setCountryName("N/A"));
    }
  }, [vendor.country_id]);

  useEffect(() => {
    if (vendor.state_id) {
      const stateUrl = `http://127.0.0.1:3001/api/v1/states/${vendor.state_id}`;
      fetch(stateUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setStateName(response.state_name))
        .catch(() => setStateName("N/A"));
    }
  }, [vendor.state_id]);

  useEffect(() => {
    if (vendor.city_id) {
      const cityUrl = `http://127.0.0.1:3001/api/v1/cities/${vendor.city_id}`;
      fetch(cityUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setCityName(response.city_name))
        .catch(() => setCityName("N/A"));
    }
  }, [vendor.city_id]);

  return (
    <>
      <div id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <section className="section">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h4>Vendor Details</h4>
            </div>
          </div>
          <hr/>
          <div>
            <Link to="/vendor" className="btn btn-dark"> Back To List</Link>
          </div>
          <div className="row mt-3 cardborder">
            <div className="col-md-6">
              <div className="tab">
                <table>
                  <tr>
                    <th>Vendor Name :</th>
                    <td>{vendor.vendor_name}</td>
                  </tr>
                  <tr>
                    <th>Vendor Email :</th>
                    <td>{vendor.email}</td>
                  </tr>
                  <tr>
                    <th>Phone :</th>
                    <td>{vendor.phone_number}</td>
                  </tr>
                  <tr>
                    <th>Contact Person :</th>
                    <td>N/A</td>
                  </tr>
                  {countryName && (
                    <tr>
                      <th>Country :</th>
                      <td>{countryName}</td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tab">
                <table>
                  {stateName && (
                    <tr>
                      <th>State :</th>
                      <td>{stateName}</td>
                    </tr>
                  )}
                  {cityName && (
                    <tr>
                      <th>City :</th>
                      <td>{cityName}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Zip Code :</th>
                    <td>{vendor.zip_code}</td>
                  </tr>
                  <tr>
                    <th>Address :</th>
                    <td>{vendor.address}</td>
                  </tr>
                  <tr>
                    <th>Description :</th>
                    <td>{vendor.description}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-3 cardborder">
            <h4>History</h4>
            <table>
              <tr className="back1">
                <th>S.No</th>
                <th>Detail</th>
                <th>OPRATION PERFORMED ON</th>
              </tr>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Vendor_details;
