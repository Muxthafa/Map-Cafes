import React, { useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import Card from "../components/Card";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
import MapContextProvider from "../store/context/map-context";

const CardList = ({ data, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, CARD_WIDTH * index, CARD_WIDTH * (index + 2)];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <MapContextProvider>
        <Card itemData={item} tranformScale={scale} />
      </MapContextProvider>
    );
  };
  return (
    <Animated.FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 30}
      snapToAlignment="center"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingHorizontal: Platform.OS === "android" ? 20 : 0,
      }}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      style={styles.container}
    />
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
