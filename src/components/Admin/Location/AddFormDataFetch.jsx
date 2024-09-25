import React, { useEffect, useState } from "react";

const LocationDataFetching = ({ setCountries, setStates, setCities }) => {
  useEffect(() => {
    const CountryData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {}
    };

    const StateData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/states");
        const data = await response.json();
        setStates(data);
      } catch (error) {}
    };

    const CityData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/cities");
        const data = await response.json();
        setCities(data);
      } catch (error) {}
    };

    CountryData();
    StateData();
    CityData();
  }, [setCountries, setStates, setCities]);

  return null; 
};

export default LocationDataFetching;
