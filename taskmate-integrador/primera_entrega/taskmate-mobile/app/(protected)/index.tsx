import React from "react";
import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";

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
