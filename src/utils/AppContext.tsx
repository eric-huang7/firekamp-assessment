import { createContext } from "react";

const defaultValue = {
  userName: "",
  updateUserName: (value: any) => {},
  cityData: "",
  updateCityData: (value: any) => {},
  locations: "",
  updateLocations: (value: any) => {},
  resetAction: () => {},
};
export const AppContext = createContext(defaultValue);
