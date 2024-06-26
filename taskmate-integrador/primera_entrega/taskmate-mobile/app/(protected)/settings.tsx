import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";

export default function SettingsPage() {
  const bgNotAvailable = require("../../assets/images/not_available.png");

  return (
    <View>
      <ImageBackground source={bgNotAvailable} style={styles.bg_styles} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg_styles: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
