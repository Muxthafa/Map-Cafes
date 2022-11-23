import React, { useEffect, useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapContextProvider from "../store/context/map-context";
import * as Location from "expo-location";
import CardList from "../components/CardList";
import StoreApi from "../utils/StoreApi";
import { MapContext } from "../store/context/map-context";

export default function Map() {
  const { addCafes, addMapRegion, cafes, mapRegion } = useContext(MapContext);

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
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    handleRegionPicker(location.coords.latitude, location.coords.longitude);
  };

  const onSelectLocation = async (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    handleRegionPicker(latitude, longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  console.log("render", mapRegion);

  return (
    <MapContextProvider>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onPress={onSelectLocation}
        >
          <Marker
            coordinate={{
              latitude: mapRegion.latitude,
              longitude: mapRegion.longitude,
            }}
            title="title"
            description="description"
          />
        </MapView>
        {cafes.length > 0 ? <CardList data={cafes} /> : null}
      </View>
    </MapContextProvider>
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
