import React, { useEffect, useState } from "react";

const CountrySelect = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/countries");
        const data = await response.json();
        console.log(data); // Add this line to check data in console
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
      
    };
  
    fetchCountries();
  }, []);
  
  return (
    <div>
      <select className="form-control" onChange={(e) => onSelectCountry(e.target.value)}>
        <option value="">Select Here</option>

        {loading ? ( // Render loading state if still loading
          <option>Loading...</option>
        ) : Array.isArray(countries) ? (

          countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country_name}
            </option>
          ))
        ) : (
          <option>No data found</option>
        )}
      </select>
    </div>
  );
};

export default CountrySelect;
