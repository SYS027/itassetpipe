import React, { useEffect, useState } from "react";

// import { List } from "react-virtualized";


const CitySelect = ({ selectedCountryId, selectedStateId, onSelectCity }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (!selectedCountryId || !selectedStateId) {
          setCities([]);
          return;
        }

        const response = await fetch(`http://127.0.0.1:3001/api/v1/cities?country_id=${selectedCountryId}&state_id=${selectedStateId}`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedCountryId, selectedStateId]);

  return (
    <select className="form-control" onChange={(e) => onSelectCity(e.target.value)}>
      <option>Select a City</option>
      {Array.isArray(cities) ? (
        cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city_name}
          </option>
        ))
      ) : (
        <option>No cities found for the selected state</option>
      )}
    </select>
  );
};

export default CitySelect;
