import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan, faPen, faPhone, faEnvelope, faUserPlus, faChartSimple, faLocationDot, faUser,faShareAlt,} from "@fortawesome/free-solid-svg-icons";
import adminImage from "../Assets/admin1.jpg";
import { Link } from "react-router-dom";
import ProfileSecondSection from "./ProfileSecondSection";
const ProfileSection = ({ sidebarOpen }) => {

  const [adminData, setAdminData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Authentication token not found in local storage.");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/v1/profiles", {
          headers: {
            Authorization: authToken,
          },
        });
        setAdminData(response.data.admin);
        setCompanyData(response.data.company);
       } catch (error) {
        setError("Error fetching data.");
      }
    };
   fetchData();
  }, []);

   return (
    <>
      <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`} >
        <section className="section m-3">
          <h4>
            <b>Profile</b>
          </h4>
          <hr />
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img src={adminImage} alt="Admin Avatar" style={{ width: "100%" }} />
                  <div className="delete-icon">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                  <h5>Contact</h5>
                  <ul className="contectIcon">
                    <li>
                      <FontAwesomeIcon icon={faPhone} className="mr-3 icon" />
                      {adminData.phone_number}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faEnvelope} className="icon" />
                      {adminData.email}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faUserPlus} className="icon" />
                      <Link >
                        <b>Refer A Friend</b>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <ProfileSecondSection/>
              <br />
                 <div className="third">
                <div className="summarydata">
                  <h6>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <b>Basic information</b>
                  </h6>
                  <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
                <div className="tab flex" style={{ marginLeft: "40px" }}>
                  <table>
                    <tbody>
                      <tr key={adminData.id}>
                        <tr>
                          <th>Full name</th>
                          <td>{adminData.name}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{adminData.email}</td>
                        </tr>
                        <tr>
                          <th>Contact No.</th>
                          <td>{adminData.phone_number}</td>
                        </tr>
                        <tr>
                          <th>Designation</th>
                          <td>Admin</td>
                        </tr>
                        <tr>
                          <th>Responsibilities</th>
                          <td>
                            Admin has access to - Assign IT Manager/IT
                            Executives, Add Locations
                          </td>
                        </tr>
                      </tr>
                   </tbody>
                  </table>
                </div>
              </div>
                   <br/><div className="third">
                <div className="summarydata">
                  <h6>
                    <FontAwesomeIcon icon={faPhone} className="mr-3 icon" />
                    <b>Company information</b>
                  </h6>
                  <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
                <div className="tab" style={{ marginLeft: "40px" }}>
                  <table>
                    <tbody>
                      <tr key={companyData.id}>
                        <tr>
                          <th>Company Name</th>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <td>{companyData.name}</td>
                        </tr>
                        <tr>
                          <th>Company Address</th>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <td>{companyData.address}</td>
                        </tr>
                      </tr>
                      <tr key={adminData.id}>
                        <tr>
                          <th>Contact Person Name</th>
                          <td>{adminData.name}</td>
                        </tr>
                        <tr>
                          <th>Contact Person Email</th>
                          <td>{adminData.email}</td>
                        </tr>
                        <tr>
                          <th>Contact Person Mobile</th>
                          <td>{adminData.phone_number}</td>
                        </tr>
                      </tr>  
                    </tbody>
                  </table>
                </div>
              </div>
                <br />
              <div className="third">
                <div className="summarydata">
                  <h6>
                    <FontAwesomeIcon icon={faShareAlt} className="icon" />
                    <b>Social Media Information</b>
                  </h6>
                  <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
              </div>
              <div className="tab" style={{ marginLeft: "40px" }}>
                <table>
                  <tbody>
                    <tr>
                      <th>Facebook</th>
                      <td>{adminData.name}.@facebook</td>
                    </tr>
                    <tr>
                      <th>Twitter</th>
                      <td>{adminData.name}.@twitter</td>
                    </tr>
                    <tr>
                      <th>LinkedIn</th>
                      <td>{adminData.name}.@linkedin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default ProfileSection;
