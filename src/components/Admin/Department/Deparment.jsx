import React, { useState, useEffect } from "react";
import DepartmentList from "./DepartmentList";
import Pagination from "./Pagination";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Department = ({ sidebarOpen }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/v1/departments");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirm =(itemId)=>{
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(itemId)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/v1/departments/${itemId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleStatusToggle = async (itemId, newStatus) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/v1/departments/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: newStatus })
        }
      );
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  status: newStatus
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <>
      <main
        id="main"
        className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
      >
        <div className="container-fluid">
          <div className="card" id="location-main">
            <main>
              <section>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="title">
                      <h4>Department</h4>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex gap-2">
                  <a href="/adddeparment" className="btn btn-primary divclr">
                    <span className="btnn">Add Department</span>
                  </a>
                  <button
                    a
                    href="#"
                    className="btn btn-dark"
                    style={{
                      backgroundColor: "#A66DD4",
                      border: "none"
                    }}
                  >
                    <span className="btnn">Export Department</span>
                  </button>
                </div>
                <div
                  className="col-12"
                  style={{
                    float: "right",
                    justifySelf: "end",
                    marginLeft: "18rem"
                  }}
                >
                  <DepartmentList
                    data={data}
                    handleDelete={confirm}
                    handleStatusToggle={handleStatusToggle}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <Pagination />
                </div>
              </section>
            </main>
          </div>
        </div>
      </main>
    </>
  );
};

export default Department;
