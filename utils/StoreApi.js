import { getListOfCafeStorePhotos } from "./PhotosApi";

const getUrlForCafeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const MapData = async (mapRegion) => {
  // const photos = await getListOfCafeStorePhotos();
  // console.log(photos);
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "",
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
      name: result.name,
      geocodes: {
        latitude: result.geocodes.main.latitude,
        longitude: result.geocodes.main.longitude,
      },
      // imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });

  return cafes;
};

export default MapData;
