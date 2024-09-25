import React, { useEffect, useState } from "react";
// import { List } from "react-virtualized";


const StateSelect = ({ selectedCountryId, onSelectState }) => {
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsLoading(true); // Set loading state
        if (!selectedCountryId) {
          setStates([]);
          return;
        }

        const response = await fetch(`http://127.0.0.1:3001/api/v1/states?country_id=${selectedCountryId}`);
        const data = await response.json();
        setStates(data);
        setIsLoading(false); // Clear loading state
      } catch (error) {
        console.error("Error fetching states:", error);
        setIsLoading(false); // Clear loading state
      }
    };

    fetchStates();
  }, [selectedCountryId]);

  return (
    <div>
      <select className="form-control" onChange={(e) => onSelectState(e.target.value)}>
        <option>Select a State</option>
        {isLoading ? (
          <option>Loading...</option>
        ) : (
          states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.state_name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default StateSelect;
