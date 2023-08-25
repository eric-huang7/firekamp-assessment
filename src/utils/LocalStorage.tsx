import AsyncStorage from "@react-native-async-storage/async-storage";

const saveItem = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

const fetchItem = (key: any) => {
  return new Promise((result, error) => {
    AsyncStorage.getItem(key)
      .then((res) => result(JSON.parse(String(res))))
      .catch((err) => error(err));
  });
};

export const clearLocalStorage = () => {
  AsyncStorage.clear();
};

// USERNAME
export const saveUserName = (value: any) => saveItem("USER_NAME", value);
export const fetchUserName = () => fetchItem("USER_NAME");

// CITY DATA
export const saveCityData = (value: any) => saveItem("CITY_DATA", value);
export const fetchCityData = () => fetchItem("CITY_DATA");

// LOCATIONS
export const saveLocations = (value: any) => saveItem("LOCATIONS", value);
export const fetchLocations = () => fetchItem("LOCATIONS");
