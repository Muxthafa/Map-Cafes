import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { height } = Dimensions.get("window");
const HEADER_HEIGHT = height / 6;

const Header = ({ address }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, textAlign: "center", color: "white" }}>
        {address}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 3,
    backgroundColor: "blue",
    height: HEADER_HEIGHT,
    width: "100%",
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
});
