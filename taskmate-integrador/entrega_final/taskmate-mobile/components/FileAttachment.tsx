import React from "react";
import { View, StyleSheet } from "react-native";
import { Badge, Box, Divider, Modal, Pressable, Text } from "native-base";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ViewAdjuntos from "./modals/ViewAdjuntos";

interface FileAttachmentsProps {}

const FileAttachments: React.FC<FileAttachmentsProps> = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // setSelectedImage(result.assets[0].uri)
    }
  };

  return (
    <Box>
      <Pressable onPress={() => setShowModal(true)}>
        <Box style={styles.inputContainer}>
          <View style={styles.input}>
            <SimpleLineIcons name="paper-clip" size={22} color="black" />
            <Text bold fontSize={"md"}>
              Adjuntos
            </Text>
          </View>

          {/* <Pressable
          onPress={handleImageSelection}
          backgroundColor={"#c4c4c4"}
          paddingY={2}
          paddingX={3}
          borderRadius={20}
          flexDirection={"row"}
          alignItems={"center"}
          mt={3}
        >
          <MaterialIcons name="add" size={20} color="black" />
          <Text ml={2} color={"#000"} bold>
            Agregar Archivo
          </Text>
        </Pressable> */}
        </Box>
      </Pressable>
      <Divider />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={"md"}
        closeOnOverlayClick={true}
      >
        <ViewAdjuntos />
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 10,
  },
  input: {
    marginTop: 5,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
});

export default FileAttachments;
