import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface CustomButtonInterface {
  title: string;
  onPress: any;
  icon: string;
  color: string;
  addStyle: Object;
  disabled: Boolean;
}

const CustomButtom: React.FunctionComponent<CustomButtonInterface> = ({
  title,
  onPress,
  icon,
  color,
  addStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, ...addStyle }}
      disabled={false}
    >
      {/*@ts-ignore */}
      <Entypo name={icon} size={25} color={color} />
      {title.length > 0 && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    height: 40,
    minWidth: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});

export default CustomButtom;
