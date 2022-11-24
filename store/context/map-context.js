import { createContext, useState } from "react";

export const MapContext = createContext({
  cafes: [],
  mapRegion: {},
  addCafes: (cafe) => {},
  addMapRegion: (region) => {},
});

function MapContextProvider({ children }) {
  const [cafes, setCafes] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function addCafes(cafe) {
    setCafes(cafe);
  }

  function addMapRegion(region) {
    setMapRegion(region);
  }

  const value = {
    cafes: cafes,
    addCafes: addCafes,
    mapRegion: mapRegion,
    addMapRegion: addMapRegion,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export default MapContextProvider;
