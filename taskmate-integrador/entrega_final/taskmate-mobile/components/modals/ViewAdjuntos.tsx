import React from "react";
import { Box, Pressable, Text } from "native-base";
import { View, StyleSheet, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "@rneui/themed";

interface ViewAdjuntosProps {}

const ViewAdjuntos: React.FC<ViewAdjuntosProps> = ({}) => {
  const files = ["image.jpg", "docunt.pdf", "image.test", "docunt.png"];

  const images = ["jpg", "png", "jpeg", "webp", "png", "jpeg", "webp"];
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Archivos Adjuntos</Text>

      <ScrollView
        style={{
          maxHeight: 500,
        }}
      >
        <Box style={styles.files}>
          {files.map((file, i) => {
            if (images.includes(file.split(".")[1])) {
              return (
                <Image
                  source={{
                    uri: "https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583",
                  }}
                  style={{
                    borderRadius: 10,
                    height: 150,
                    width: 100,
                    resizeMode: "cover",
                  }}
                />
              );
            } else {
              return (
                <Pressable
                  height={40}
                  key={i}
                  style={{
                    height: 150,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "crimson",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <FontAwesome6 name="file-pdf" size={20} color="white" />
                  <Text isTruncated maxW={120} color={"white"}>
                    {file}
                  </Text>
                </Pressable>
              );
            }
          })}
        </Box>
      </ScrollView>
    </View>
  );
};

export default ViewAdjuntos;

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    height: "auto",
    flexDirection: "column",
    minHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  files: {
    gap: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  file: {},
});
