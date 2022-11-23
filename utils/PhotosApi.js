import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: "",
});

export const getListOfCafeStorePhotos = async () => {
  try {
    const photos = await unsplashApi.search.getPhotos({
      query: "coffee shop",
      perPage: 30,
    });
    const pics = await fetch(
      "https://api.unsplash.com/search/users?page=1&query=coffee"
    );
    // console.log(photos.response?.results[0]);
  } catch (error) {
    console.log("error");
    console.log(error);
  }

  const unsplashResults = photos.response?.results || [];

  return unsplashResults.map((result) => result.urls["small"]);
};
