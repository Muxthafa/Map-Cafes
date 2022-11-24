import { cafeImages } from "../constants/images-array";
import Constants from "expo-constants";

const PLACES_API_KEY = Constants.manifest.extra.PLACES_API_KEY;

const getUrlForCafeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const MapData = async (mapRegion) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: PLACES_API_KEY,
    },
  };
  const latLang = `${mapRegion.latitude},${mapRegion.longitude}`;

  const response = await fetch(
    getUrlForCafeStores(latLang, "cafe", 5),
    options
  );
  const data = await response.json();

  const cafes = data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      address: result.location.address,
      fullAddress: result.location.formatted_address,
      name: result.name,
      geocodes: {
        latitude: result.geocodes.main.latitude,
        longitude: result.geocodes.main.longitude,
      },
      imgUrl:
        cafeImages.length > 0
          ? cafeImages[Math.floor(Math.random() * 9) + 1]
          : null,
    };
  });

  return cafes;
};

export default MapData;
