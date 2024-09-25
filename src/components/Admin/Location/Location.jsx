import React, { useState, useEffect } from "react";
import "../Location/Location.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationSearchBar from "./LocationSearchBar";
import LocationTable from "./LocationTable";
import LocationPagination from "./LocationPagination";

const Location = ({ sidebarOpen }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(true);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const storedPage = localStorage.getItem("itemsPerPage");
    return storedPage ? parseInt(storedPage) : 5;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/locations");
        const data = await response.json();
        setData(data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/v1/locations/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
      } else {
      }
    } catch (error) {}
    window.location.reload();
  };

  useEffect(() => {
    if (data.state_id) {
      const stateUrl = `http://127.0.0.1:3001/api/v1/states/${data.state_id}`;
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
  }, [data.state_id]);

  useEffect(() => {
    if (data.city_id) {
      const cityUrl = `http://127.0.0.1:3001/api/v1/cities/${data.city_id}`;
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
  }, [data.city_id]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filterLocations = Array.isArray(data)
    ? data.filter(
        (data) =>
          data.office_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.poc_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/v1/locations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: newStatus,
          }),
        }
      );
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, is_active: newStatus } : item
          )
        );
        console.log("status updated");
      } else {
        console.error("Error updating data:", response);
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterLocations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <div className="card" id="sectionlocation">
          <section>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <h4>Locations</h4>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 d-flex gap-2">
                <button className="btn-vendor">
                  <a
                    href="/addlocation"
                    className="btn btn-primary addlocationbtn"
                  >
                    Add Locations
                  </a>
                </button>
                &nbsp;&nbsp;
                <button className="btn-vendor">
                  <Link href="#" className="btn btn-dark venderbtn">
                    Export
                  </Link>
                </button>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-md-12 paginationdrop">
                <span className="entry_show">Show</span>
                <select
                  name="DataTables_Table_3_length"
                  aria-controls="DataTables_Table_3"
                  className="custom-select custom-select-sm form-control form-control-sm paginationselect"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={120}>all</option>
                </select>
                <span className="entry_show">entries</span>
              </div>
            </div>
            <div className="locationsearchbar">
            <LocationSearchBar handleSearch={handleSearch} />
            </div>
            <div className="locationtable">
            <LocationTable
              currentItems={currentItems}
              updateStatus={updateStatus}
              handleDelete={handleDelete}
            />
            <div className="row mt-3">
              <div className="col-sm-12 col-md-5">
                <div
                  className="dataTables_info"
                  id="DataTables_Table_3_info"
                  role="status"
                  aria-live="polite"
                >
                  {`Showing ${indexOfFirstItem + 1} to ${
                    indexOfLastItem > filterLocations.length
                      ? filterLocations.length
                      : indexOfLastItem
                  } of ${filterLocations.length} entries`}
                </div>
              </div>
            </div>
            </div>
            <div className="locationpaginate"> 
            <LocationPagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              filterLocations={filterLocations}
              paginate={paginate}
            />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Location;