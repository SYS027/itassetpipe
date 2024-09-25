import React, { useState } from "react";
import "./Sidebar.css";
import{Link} from "react-router-dom"

const Sidebar = ({ isOpen, toggle }) => {
  const [open, setOpen] = useState(true);
  const [adminopen, setAdminOpen] = useState(true);
  const [showMinusIcon, setShowMinusIcon] = useState(true);
  const [showAdminSection, setShowAdminSection] = useState(true);

  const toggleSection = () => {
    setOpen(!open);
    setShowMinusIcon(!showMinusIcon);
  };

  const toggleAdminSection = () => {
    setAdminOpen(!adminopen);
    setShowAdminSection(!showAdminSection);
  };

  return (
    <nav id="sidebar" className={isOpen ? "active" : ""}>
      <section className="pt-4">
        <ul className="list-unstyled components" id="side-ul">
          <li id="list-card" className="mb-3">
            <i class="fa-solid fa-house"></i>
            <Link to="/home" >Home</Link>
          </li>
          <li id="list-card" className="mb-3">
            <i class="fa-solid fa-user-group"></i>
            <a href="/vendor" >Vendors</a>
          </li>
          <li id="list-card" className="mb-3">
            <i class="fa-brands fa-codepen"></i>
            <a href="/product" >Products</a>
          </li>
          <li id="list-card" className="mb-3 p-1">
            <div className="row m-0" onClick={toggleSection}>
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-6" id="Admin_column">
                    <i class="fa-solid fa-gear"></i>
                    <Link to="#" >Assets</Link>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-2" id="plus">
                    <button className="border-0" onClick={toggleSection}>
                      {open ? (
                        <i className="fas fa-plus"></i>
                      ) : (
                        <i className="fas fa-minus"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="dropdown_asset p-0">
                <section className={open ? "drop-assests" : "hidden"}>
                  <li id="dropmenu_asset"> <a href="/home/assetadd">Add</a> </li>                                    
                  <li id="dropmenu_asset" > <a href="/home/addlist">List</a> </li>
                  <li id="dropmenu_asset"> <a href="/assignasset">Assigned Assets</a> </li>                                     
                </section>
              </div>
            </div>
          </li>
          <li id="list-card" className="p-1">
            <div className="row m-0" onClick={toggleAdminSection}>
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-6" id="Admin_column">
                    <i class="fa-solid fa-crown"></i>{" "}
                    <Link to="#" onClick={toggleAdminSection} >Admin </Link>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-2" id="plus">
                    <button className="border-0" onClick={toggleAdminSection}>
                      {adminopen ? (
                        <i className="fas fa-plus"></i>
                      ) : (
                        <i className="fas fa-minus"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="dropdown_asset p-0">
                <section className={adminopen ? "drop-assests" : "hidden"}>
                  <li id="dropmenu_asset"><a href="/location">Location</a></li>                 
                  <li id="dropmenu_asset" ><a href="/notification">Notification</a></li>                  
                  <li  id="dropmenu_asset"><a href="/deparment">Department</a></li>                 
                  <li  id="dropmenu_asset"><a href="/employee">Employee</a></li>              
                </section>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </nav>
  );
};
export default Sidebar;
