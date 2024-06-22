import React from "react";
import { View, StyleSheet } from "react-native";
import { Box, Divider, Modal, Pressable } from "native-base";
import { Text } from "native-base";
import { Chip } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SelectStateModal from "./modals/SelectState";
import { ColorCategory } from "@/constants/colors";

interface StateSelectorProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({
  selectedState,
  setSelectedState,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  // @ts-ignore
  const color = ColorCategory[selectedState] || "#F6F6F6";

  const handleSave = (value: string) => {
    setSelectedState(value);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <Pressable
        onPress={() => setShowModal(true)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Box style={styles.inputContainer}>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="progress-question"
              size={24}
              color="black"
            />
            <Text style={{ fontSize: 16, textAlign: "center" }}>Estado : </Text>
          </View>
          <Chip
            {...{
              label: selectedState,
              backgroundColor: color,
              labelStyle: { fontSize: 14, color: "#fff" },
              containerStyle: { borderWidth: 0 },
              borderRadius: 10,
            }}
          />
        </Box>
      </Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={"md"}
        closeOnOverlayClick={false}
      >
        <SelectStateModal onSave={handleSave} onCancel={handleCancel} />
      </Modal>
      <Divider />
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
  },
  input: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
});

export default StateSelector;
