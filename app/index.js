import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import ProductsScreen from "./screens/ProductsScreen";
import ListingsScreen from "./screens/ListingsScreen";

import colors from "./config/colors";

export default function Page() {
  return (
    <>
      <View>
        <Text style={styles.heading}>All Listing</Text>
      </View>
      <ListingsScreen />
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: colors.gold,
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 15,
    paddingBottom: 25,
    paddingLeft: 12,
  },
});
