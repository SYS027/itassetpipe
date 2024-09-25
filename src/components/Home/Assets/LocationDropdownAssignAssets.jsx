import React from 'react';

const LocationDropdown = ({ locations, selectedLocation, setSelectedLocation }) => {
  return (
    <div className="col-md-3">
      <label htmlFor="location">Location</label>
      <select
        id="location"
        name="location"
        className="form-control"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(parseInt(e.target.value, 10))}
      >
        <option value="">--Choose a Location--</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.office_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationDropdown;
