import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Employee/AddEmployee.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const AddEmployee = ({ sidebarOpen }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employee_id, setEmployee_id] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState();
    const [reporting_manager, setreportManager] = useState("");
    const [department, setDepartment] = useState();
    const [employeeName, setEmployeeName] = useState([])
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [locations, setLocations] = useState([]);

    const isEmailValid = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const isPhoneNumberValid = (phone) => {
        const phoneRegex = /^\d+$/;
        return phoneRegex.test(phone);
    };

    const fetchLocation = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3001/api/v1/locations");
            const data = await response.json();
            setLocations(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchDeparment = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3001/api/v1/departments");
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchEmployee = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3001/api/v1/employee");
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const jsonData = await response.json();
            setEmployeeName(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDeparment();
        fetchEmployee();
        fetchLocation();
    }, [])

    const createEmployee = async () => {
        try {
            if (!name || !email || !employee_id || !phone || !location || !department) {
                Swal.fire({
                    title: 'All Fields are Required',
                })
                return;
            }

            if (!isEmailValid(email)) {
                alert("Please enter a valid email");
                return;
            }

            if (!isPhoneNumberValid(phone) || phone.length < 10) {
                alert("please enter phone number");
                return;
            }

            const response = await fetch("http://127.0.0.1:3001/api/v1/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    name: name,
                    email: email,
                    phone: phone,
                    employee_id: employee_id,
                    location_id: location,
                    reporting_manager: reporting_manager,
                    department_id: department
                }),
            });
            if (response.ok) {
                console.log("success");
                setName("");
                setEmail("");
                setEmployee_id("");
                setPhone("");
                setLocation("");
                setreportManager("");
                setDepartment("")
                alert("Data add sucessfully!");
                navigate("/employee")
            } else {
                console.log("not created");
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`} >
            <div className="container-fluid">
                <div className="card1">
                    <section className="section" >
                        <div className="popup">
                            <p className="addhead">Add Employee</p>
                            <div id="data">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name<span style={{ color: "red" }}> *</span></label><br />
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label >Email<span style={{ color: "red" }}> *</span></label><br />
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label >Employee ID<span style={{ color: "red" }}> *</span></label><br />
                                        <input type="text" className="form-control" value={employee_id} onChange={(e) => setEmployee_id(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label >Phone<span style={{ color: "red" }}> *</span></label><br />
                                        <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label >Locations<span style={{ color: "red" }}> *</span></label>
                                        <select className="form-control" value={location} onChange={(e) => setLocation(parseInt(e.target.value, 10))} >
                                            <option value>--Choose your location--</option>
                                            {locations.map((item) =>
                                                <option key={item.id} value={item.id}>{item.office_name}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Reporting Manager</label>
                                        <select className="form-control" value={reporting_manager} onChange={(e) => setreportManager(e.target.value)}>
                                            <option value>--Choose Select Reporting Manager--</option>
                                            {employeeName.map((item) =>
                                                <option>{item.name}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Department<span style={{ color: "red" }}> *</span></label>
                                        <select
                                            className="form-control"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                        >
                                            <option value="">--Choose Department--</option>
                                            {data.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.department_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <Link to="/employee" className="btn btn-dark mx-2">Close</Link>
                                <Link className="button" onClick={createEmployee} >Save</Link>
                            </div>
                        </div><br />
                    </section>
                </div>
            </div>
        </main>
    )
}
export default AddEmployee;