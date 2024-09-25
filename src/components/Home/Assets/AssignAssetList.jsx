import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignAssetTable from "./AssignAssetTableAssignList";
import AssignAssetPagination from "./AssignAssetPaginationAssignList";

const AssignAssetList = ({ sidebarOpen }) => {
  const [assignAssets, setAssignAsset] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const assignData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/api/v1/assign_assets"
      );
      const data = await response.json();
      console.log("Data from API:", data);
      setAssignAsset(data);
    } catch (error) {
      console.error("Error fetching assign assets:", error);
    }
  };

  useEffect(() => {
    assignData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:3001/api/v1/assign_assets/${id}`, {
        method: "DELETE",
      });

      setAssignAsset(assignAssets.filter((asset) => asset.id !== id));
    } catch (error) {
      console.error("Error deleting assign asset:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) =>
          fetch(`http://127.0.0.1:3001/api/v1/assign_assets/${id}`, {
            method: "DELETE",
          })
        )
      );
      setAssignAsset(
        assignAssets.filter((asset) => !selectedItems.includes(asset.id))
      );

      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting assign assets:", error);
    }
  };

  const filteredAssignAssets = assignAssets.filter(
    (assign_asset) =>
      assign_asset.asset_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assign_asset.assign_to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = async (id, newStatus) => {
    try {
      await fetch(`http://127.0.0.1:3001/api/v1/assign_assets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: newStatus }),
      });

      setAssignAsset((prevAssign) =>
        prevAssign.map((assign_asset) =>
          assign_asset.id === id
            ? { ...assign_asset, is_active: newStatus }
            : assign_asset
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const itemsPerPage = 10; // Number of items per page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignAssets = filteredAssignAssets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  
  return (
    <>
      <div id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <main className="card">
        <section className="section">
            <div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="title">
                    <h4>Assign Asset List</h4>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 ">
                <button className="btn-vendor mx-2">
                  <Link
                    to="/assignasset"
                    className="btn btn-primary"
                    id="AddVendor"
                  >
                    Add Assign Assets
                  </Link>
                </button>
                <button className="btn-vendor mx-2">
                  <Link to="#" className="btn btn-dark" id="Export">
                    Export
                  </Link>
                </button>
                <button className="btn-vendor" onClick={handleDeleteSelected}>
                  <Link to="#" className="btn btn-primary" id="delete">
                    Delete
                  </Link>
                </button>
              </div>
            </div>
            <div
              className="col-sm-6 col-md-4 col-12"
              style={{ float: "right", justifySelf: "end" }}
            >
              <div className="input-group rounded blue">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-md-12 d-flex">
                <span className="entry_show">Show</span>
                <select
                  name="DataTables_Table_3_length"
                  aria-controls="DataTables_Table_3"
                  className="custom-select custom-select-sm form-control form-control-sm"
                  style={{ width: "auto" }}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="-1">All</option>
                </select>
                <span className="entry_show">entries</span>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm-12 row1">
                {/* Use the AssignAssetTable component */}
                <AssignAssetTable
                  currentAssignAssets={currentAssignAssets}
                  selectedItems={selectedItems}
                  handleCheckboxChange={handleCheckboxChange}
                  handleToggle={handleToggle}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
            {/* ... */}
            {/* Use the AssignAssetPagination component */}
            <AssignAssetPagination
              currentPage={currentPage}
              pageCount={Math.ceil(filteredAssignAssets.length / itemsPerPage)}
              handlePageChange={handlePageChange}
              filteredAssignAssets={filteredAssignAssets} // Pass the props here
              itemsPerPage={itemsPerPage} // Pass the props here
            />
          </section>
        </main>
      </div>
    </>
  );
};

export default AssignAssetList;