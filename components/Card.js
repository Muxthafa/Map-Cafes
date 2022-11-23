import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { MapContext } from "../store/context/map-context";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

const Card = ({ itemData, tranformScale }) => {
  const { addMapRegion, mapRegion } = useContext(MapContext);

  const handleRegionSelection = () => {
    addMapRegion({
      latitude: itemData.geocodes.latitude,
      longitude: itemData.geocodes.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  console.log("card", mapRegion);

  return (
    <Animated.View style={styles.card}>
      <TouchableOpacity
        style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}
        onPress={handleRegionSelection}
      >
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.name}</Text>

          <Text numberOfLines={2} style={styles.cardDetails}>
            {itemData.address}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    zIndex: 5,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginVertical: 10,
    flexDirection: "row",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
