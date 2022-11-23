import React, { useEffect, useState, useContext } from "react";
import Map from "./screens/Map";
import MapContextProvider from "./store/context/map-context";

export default function App() {
  return (
    <MapContextProvider>
      <Map />
    </MapContextProvider>
  );
}
