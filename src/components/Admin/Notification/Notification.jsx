import React, { useEffect, useState } from "react";

import '../Notification/Notification.css';
const Notification = ({ sidebarOpen }) => {
const[notifications, setNotifications]= useState([]);

const notificationData = async()=>{
    try{
        const response = await fetch("http://127.0.0.1:3001/api/v1/notifications");
        const data = await response.json();
        setNotifications(data);
    } catch(error){console.error("error fetching notifications", error)};
}
 useEffect(()=>{
    notificationData();
 },[]);


    return (
        <>
         <main  id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`} >   
            <div className="container-fluid" >
                <div className="card">
                <main id="main-notification" >
                    <section >
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Notification</h4>
                                </div>
                            </div>
                        </div><hr />
                        <div className="row mt-5 ">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Software Warranty Expiry</h4>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 ">
                                <select className="form-select" aria-label="Default select example">
                                <option selected>DAYS</option>
                                    {notifications.map((notification)=>(
                                        <option key={notification.id} value={1}>{notification.software_warranty_expiry}</option> 
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Hardware Warranty Expiry</h4>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <select className="form-select" aria-label="Default select example">
                                <option selected>DAYS</option>
                                    {notifications.map((notification)=>(
                                        <option key={notification.id} value={1}>{notification.hardware_warranty_expiry}</option> 
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>
                </main>
                </div>
            </div>
        </main>    
        </>
    )

}
export default Notification;