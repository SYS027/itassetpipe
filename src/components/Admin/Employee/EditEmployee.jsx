import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import '../Employee/AddEmployee.css';
import { Link } from "react-router-dom";

const EditEmployee = ({ sidebarOpen }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employee_id, setEmployee_id] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState();
    const [reportManager, setReportManager] = useState("");
    const [department, setDepartment] = useState();
    const [data, setData] = useState([])
    const [fullDeparment, setFulldeparment] = useState([]);
    const [employeeName, setEmployeeName] = useState([])
    const navigate = useNavigate();
    const params = useParams();
    const [locations, setLocations] = useState([]);

    const fetchLocation = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3001/api/v1/locations");
            const data = await response.json();
            setLocations(data);
            console.log(data, "locations");
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
            setFulldeparment(jsonData);
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

    const fetchEmployeeData2 = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/api/v1/employee/${params.id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const employeeData = await response.json();
            setData(employeeData)
            setName(employeeData.name);
            setEmail(employeeData.email);
            setEmployee_id(employeeData.employee_id)
            setPhone(employeeData.phone)
            setLocation(employeeData.location_id)
            setReportManager(employeeData.reporting_manager)
            setDepartment(employeeData.department_id)
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    useEffect(() => {
        fetchDeparment();
        fetchEmployee();
        fetchLocation();
        fetchEmployeeData2();
    }, [params.id]);

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:3001/api/v1/employee/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, employee_id, phone, location_id: location, reportManager, department_id: department
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            navigate("/employee");
        } catch (error) {
            console.error("Error updating employee data:", error);
        }
    };

    return (
        <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
            <div className="container-fluid">
                <div className="card1">
                    <section className="section">
                        <div className="popup">
                            <p className="addhead">Edit Employee</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="#">Name</label><br />
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="#">Email</label><br />
                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="#">Employee ID</label><br />
                                    <input type="text" className="form-control" value={employee_id} onChange={(e) => setEmployee_id(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="#">Phone</label><br />
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="#">Locations</label>
                                    <select className="form-control" value={location} onChange={(e) => setLocation(parseInt(e.target.value, 10))} >
                                        <option value>--Choose your location--</option>
                                        {locations.map((item) =>
                                            <option key={item.id} value={item.id}>{item.office_name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="#">Reporting Manager</label>
                                    <select className="form-control" value={reportManager} onChange={(e) => setReportManager(e.target.value)}>
                                        <option value>--Choose Select Reporting Manager--</option>
                                        {employeeName.map((item) =>
                                            <option>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="#">Department</label>
                                    <select className="form-control" value={department} onChange={(e) => setDepartment(parseInt(e.target.value, 10))}>
                                        <option value>--Choose Department--</option>
                                        {fullDeparment.map((item) =>
                                            <option key={item.id} value={item.id}>{item.department_name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <Link to="/employee" className="btn btn-dark mx-2">Close</Link>
                            <Link className="button" onClick={updateEmployee}>Update</Link>
                        </div><br />
                    </section>
                </div>
            </div>
        </main>
    )
}
export default EditEmployee;