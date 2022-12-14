import { useContext, useState } from "react";
import { MapContext } from "../store/context/map-context";
import StoreApi from "../utils/StoreApi";
import * as Location from "expo-location";

const useCurrentLocation = () => {
  const [loading, setLoading] = useState(true);
  const { addCafes, addMapRegion } = useContext(MapContext);

  const handleRegionPicker = async (latitude, longitude) => {
    const currRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    addMapRegion(currRegion);
    const cafes = await StoreApi(currRegion);

    addCafes(cafes);
    setLoading(false);
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw Error("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    handleRegionPicker(location.coords.latitude, location.coords.longitude);
  };

  return {
    userLocation,
    loading,
  };
};

export default useCurrentLocation;
