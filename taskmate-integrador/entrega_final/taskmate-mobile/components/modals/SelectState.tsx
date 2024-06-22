import React, { useState } from "react";
import { Box, Button, Pressable, Text } from "native-base";
import { View, StyleSheet } from "react-native";

const SelectStateModal: React.FC<{
  onSave: (value: string) => void;
  onCancel: () => void;
}> = ({ onSave, onCancel }) => {
  const [selectedState, setSelectedState] = useState("");

  const handlePress = (state: string) => {
    setSelectedState(state);
  };

  const renderSelectableInput = (label: string) => {
    const isActive = selectedState === label;
    const backgroundColor = isActive ? "#57A9C2" : "#F6F6F6";
    const labelColor = isActive ? "#FFF" : "#000";

    return (
      <Pressable
        onPress={() => handlePress(label)}
        key={label}
        style={[styles.input, { backgroundColor }]}
      >
        <Text style={[styles.inputText, { color: labelColor }]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Establece un estado para la tarea</Text>
      <Box style={styles.inputs}>
        {[
          "Pendiente",
          "En Proceso",
          "Rechazado",
          "En Revisión",
          "Finalizado",
        ].map(renderSelectableInput)}
      </Box>
      <Box style={styles.buttonActions}>
        <Button style={styles.button} onPress={onCancel}>
          <Text style={{ color: "#9A9A9A", fontSize: 16 }}>CANCELAR</Text>
        </Button>
        <Button
          isDisabled={!selectedState}
          style={{ backgroundColor: "transparent", borderRadius: 18 }}
          onPress={() => onSave(selectedState)}
        >
          <Text style={{ color: "#57A9C2", fontSize: 16 }}>ACEPTAR</Text>
        </Button>
      </Box>
    </View>
  );
};

export default SelectStateModal;

const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    height: "auto",
    flexDirection: "column",
    minHeight: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  inputs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
  },
  input: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  inputText: {
    fontSize: 12,
    width: "auto",
    fontWeight: "600",
  },
  buttonActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    columnGap: 12,
  },

  button: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});
