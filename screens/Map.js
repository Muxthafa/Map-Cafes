import React, { useEffect, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import CardList from "../components/CardList";
import { MapContext } from "../store/context/map-context";
import useCurrentLocation from "../hooks/useCurrentLocation";
import Header from "../components/Header";

export default function Map() {
  const { userLocation } = useCurrentLocation();
  const { cafes, mapRegion } = useContext(MapContext);

  const coords = {
    latitude: mapRegion.latitude,
    longitude: mapRegion.longitude,
  };

  const currentAddress = cafes.filter(
    (cafe) =>
      cafe.geocodes.latitude === mapRegion.latitude &&
      cafe.geocodes.longitude === mapRegion.longitude
  );

  const address = currentAddress[0]?.fullAddress;

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="blue" />
      {address && <Header address={address} />}

      <MapView style={styles.map} region={mapRegion}>
        <Marker
          coordinate={{ ...coords }}
          title="title"
          description="description"
        />
      </MapView>
      {cafes.length > 0 ? <CardList data={cafes} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
