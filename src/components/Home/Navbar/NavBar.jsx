import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../Assets/Cylsys.png";
import profile from "../../Assets/admin1.jpg";
import "./Navbar.css";
import SideBar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [error, setError] = useState(null);
  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3001/api/v1/logout", {
      method: "DELETE",
      credentials: "include",
      mode: "cors", // Add this line to explicitly specify CORS mode
      headers: {
        "Content-Type": "application/json", // Add this line to set the content type
      },
    });
    if (response.ok) {
      console.log("Logout successful");
      localStorage.setItem("authToken", "");
      window.location.href = "/login";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};


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
      } catch (error) {
        setError("Error fetching data.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`header-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="container-fluid fixed-top shadow-sm bg-white" id="nav-container-fluid">
        <div className="row">
          <div className="col-md-3 d-flex justify-content-between" id="nav_main">
            <div><Link to="/Home">
              <img src={logo} alt="images" className="logo-img w-100 m-0"/></Link>
            </div> 
            <div><i className="fa-solid fa-bars" id="menu_icon_navbar" onClick={handleSidebarToggle}/></div>              
          </div>
          <div className="col-md-2 "/>
          <div className="col-md-7  p-0">
            <ul className="m-0" id="ul-navbar">
              <li> <p className="username_navbar">{adminData.name}</p> </li>
              <li><a href="/profile"><img src={profile} alt="profile_picture" className="profile-img" /> </a></li>
              <li> <div className="bell_icon_navbar"> <i className="fa-solid fa-bell" id="bell-nav"></i></div></li>
              <li>
                <div><p className="logout-navbar">            
                    <li className="nav-item dropdown pe-4 list-inline">
                      <Link className="nav-link dropdown-toggle text-black small" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >              
                        <span className="userclr"> User </span>
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" id="dropdown-logout">
                        <li><Link className="dropdown-item d-flex align-items-center" href="#" onClick={handleLogout}>
                          <i className="fa fa-sign-out"></i> 
                          <span>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SideBar isOpen={sidebarOpen} />
    </div>
  );
};
export default Navbar;
