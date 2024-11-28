/** @format */

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";


const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/charging.gif")}
        style={{ width: '70%', height: '70%'}}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    zIndex: 100,
  },
});
