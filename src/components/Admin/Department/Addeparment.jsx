import React, { useState } from "react";
import "../Department/Add.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Addeparment = ({ sidebarOpen }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const createDepartment = async () => {
    try {
      setEmailError("");
      setPhoneError("");

      if (!departmentName || !contactPersonName || !contactPersonEmail || !contactPersonPhone) {
        Swal.fire({
          title: 'All Fields are Required',
        });
        return;
      }

      if (!isEmailValid(contactPersonEmail)) {
        setEmailError("Invalid email address");
        return;
      }

      if (!isPhoneNumberValid(contactPersonPhone)) {
        setPhoneError("Invalid phone number (minimum 10 digits)");
        return;
      }

      const response = await fetch("http://127.0.0.1:3001/api/v1/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: {
            department_name: departmentName,
            contact_person_name: contactPersonName,
            contact_person_email: contactPersonEmail,
            contact_person_phone: contactPersonPhone,
            company_id: 1,
          },
        }),
      });
  
      if (response.ok) {
        Swal.fire({
          title: 'Data is successfully added',
          icon: 'success', // Display a success icon
        });
  
        setDepartmentName("");
        setContactPersonName("");
        setContactPersonEmail("");
        setContactPersonPhone("");
  
        navigate("/deparment");

      } else {
        console.log("not created");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <div className="container-fluid">
          <div className="card" id="adddepartment">
            <div>
              <main>
                <section>
                  <div>
                    <div className="popup">
                      <header className="wid">
                        <p className="addhead mt-2">Add Department</p>
                      </header>
                      <div id="data">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="#">Department Name *</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="#">Contact Person Name *</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              value={contactPersonName}
                              onChange={(e) => setContactPersonName(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="#">Contact Person Email *</label>
                            <br />
                            <input
                              type="email"
                              className={`form-control ${emailError ? "is-invalid" : ""}`}
                              value={contactPersonEmail}
                              onChange={(e) => setContactPersonEmail(e.target.value)}
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="#">Contact Person Phone *</label>
                            <br />
                            <input
                              type="number"
                              className={`form-control ${phoneError ? "is-invalid" : ""}`}
                              value={contactPersonPhone}
                              onChange={(e) => setContactPersonPhone(e.target.value)}
                            />
                            {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex gap-2">
                          <Link to="/deparment" className="btn btn-dark">
                            Close
                          </Link>
                          <button
                            className="btn btn-primary"
                            onClick={createDepartment}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Addeparment;
