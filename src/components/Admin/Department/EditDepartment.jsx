import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditDepartment = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const [formData, setFormData] = useState({
    department_name: "",
    contact_person_name: "",
    contact_person_email: "",
    contact_person_phone: ""
  });

  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/v1/departments/${departmentId}`
      );
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
      fetchDepartmentData();
    },
    [departmentId]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/v1/departments/${departmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );
      if (response.ok) {
        navigate("/Deparment");
      } else {
        console.error("Error updating data:", response);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }   
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };
  return (
    <div>
      <main
        id="main"
        className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="container-fluid">
            <div className="card" id="location-main">
              <div>
                <main>
                  <section>
                    <div>
                      <div className="popup">
                        <header className="wid">
                          <p className="addhead">Edit Department</p>
                        </header>
                        <div id="data">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="#">Department Name</label> <br />
                              <input
                                type="text"
                                className="form-control"
                                name="department_name"
                                value={formData.department_name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="#">
                                Contact Person Name
                              </label>{" "}
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="contact_person_name"
                                value={formData.contact_person_name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="#">
                                Contact Person Email
                              </label>{" "}
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="contact_person_email"
                                value={formData.contact_person_email}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="#">
                                Contact Person Phone
                              </label>{" "}
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="contact_person_phone"
                                value={formData.contact_person_phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <br />
                          <div>
                            <button type="submit" className="btn btn-dark">
                              {" "}Save Changes{" "}
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
        </form>
      </main>
    </div>
  );
};
export default EditDepartment;
