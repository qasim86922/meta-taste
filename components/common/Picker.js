import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

const Picker = ({ onValueChange, items, placeholder }) => {
  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      items={items}
      placeholder={placeholder}
      style={pickerSelectStyles.inputAndroid}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 26,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Picker;
