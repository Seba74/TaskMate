import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Box, Divider, Pressable } from "native-base";
import { Text } from "native-base";
import { Chip } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "@/utilities/date";

interface DateSelectorProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <Box>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Box style={styles.inputContainer}>
          <View style={styles.input}>
            <MaterialCommunityIcons name="calendar" size={24} color="black" />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Fecha de vencimiento :{" "}
            </Text>
          </View>
          <Chip
            {...{
              label: formatDate(selectedDate),
              backgroundColor: "#F6F6F6",
              labelStyle: { fontSize: 14, color: "#000" },
              containerStyle: { borderWidth: 0 },
              borderRadius: 10,
            }}
          />
        </Box>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={selectedDate}
          onChange={handleDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(new Date().getFullYear() + 2, 11, 31)}
          positiveButton={{label: 'Aceptar', textColor: '#57A9C2'}}
          negativeButton={{label: 'Cancelar', textColor: '#9A9A9A'}}
        />
      )}
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

export default DateSelector;
