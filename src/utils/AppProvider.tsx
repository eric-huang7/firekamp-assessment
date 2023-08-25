import React, { useEffect, useMemo, useState } from "react";

import {
  fetchCityData,
  fetchLocations,
  fetchUserName,
  saveCityData,
  saveLocations,
  saveUserName,
} from "./LocalStorage";

import { AppContext } from "./AppContext";

const AppProvider: React.FC = (props) => {
  const [userName, setUserName] = useState("");
  const [cityData, setCityData] = useState("");
  const [locations, setLocations] = useState("");

  useEffect(() => {
    getLocalValues();
  }, []);

  const getLocalValues = async () => {
    let userName = await fetchUserName();
    if (userName) {
      setUserName(userName);
    }

    let cityData = await fetchCityData();
    if (cityData) {
      setCityData(cityData);
    }

    let locations = await fetchLocations();
    if (locations) {
      setLocations(locations);
    }
  };

  const updateUserName = (value: String) => {
    saveUserName(value);
    setUserName(value);
  };

  const updateCityData = (value: String) => {
    saveCityData(value);
    setCityData(value);
  };

  const updateLocations = (value: String) => {
    saveLocations(value);
    setLocations(value);
  };

  const resetAction = () => {
    updateUserName("");
    updateCityData("");
    updateLocations("");
  };

  const providerValue = useMemo(
    () => ({
      userName,
      updateUserName,
      cityData,
      updateCityData,
      locations,
      updateLocations,
      resetAction,
    }),
    [
      userName,
      updateUserName,
      cityData,
      updateCityData,
      locations,
      updateLocations,
      resetAction,
    ]
  );

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
