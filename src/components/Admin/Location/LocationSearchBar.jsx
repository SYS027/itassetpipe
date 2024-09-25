import React from "react";

const LocationSearchBar = ({ handleSearch }) => {
  return (
    <div className="col-sm-6 col-md-4 col-12 searchbar  m-1">
      <div className="input-group rounded blue">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={handleSearch}
        />
        <span
          className="input-group-text border-0 blue"
          id="search-addon"
        >
          <i className="fas fa-search" />
        </span>
      </div>
    </div>
  );
};

export default LocationSearchBar;