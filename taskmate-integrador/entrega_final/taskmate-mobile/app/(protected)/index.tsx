import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

type CardsComponentsProps = {};

const Home: React.FunctionComponent<CardsComponentsProps> = () => {
  const bgNotAvailable = require("../../assets/images/not_available.png");
  return (
    <View>
      <ImageBackground source={bgNotAvailable} style={styles.bg_styles} />
    </View>
  );
};

const styles = StyleSheet.create({
  bg_styles: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
