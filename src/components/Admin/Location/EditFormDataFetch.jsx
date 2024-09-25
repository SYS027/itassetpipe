import React, { useEffect } from "react";

const LocationDataFetch = ({
  params,
  setData,
  setId,
  setOffice_name,
  setPoc_email,
  setPoc_contact,
  setPoc_name,
  setSelectedCountryId,
  setSelectedStateId,
  setSelectedCityId,
  setZip_code,
}) => {
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/api/v1/locations/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const locationData = await response.json();
        setData(locationData);
        setId(locationData.id);
        setOffice_name(locationData.office_name);
        setPoc_email(locationData.poc_email);
        setPoc_contact(locationData.poc_contact);
        setPoc_name(locationData.poc_name);
        setSelectedCountryId(locationData.country_id);
        setSelectedStateId(locationData.state_id);
        setSelectedCityId(locationData.city_id);
        setZip_code(locationData.zip_code);
      } catch (error) {}
    };
    fetchLocationData();
  }, [params.id]);

  return null;
};

export default LocationDataFetch;
