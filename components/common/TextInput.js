import React from "react";
import { TextInput } from "react-native";

const InputField = ({
  height,
  placeholder,
  onChangeText,
  width,
  editable,
  value = "",
  multiline = false,
}) => {
  return (
    <TextInput
      style={{
        color: "black",
        height: height,
        width: width,
        borderColor: "gray",
        borderWidth: 2,
        paddingLeft: 15,
        marginTop: 10,
        borderRadius: 5,
      }}
      placeholder={placeholder}
      placeholderTextColor={"black"}
      onChangeText={onChangeText}
      editable={editable}
      value={value ? value : null}
      multiline={multiline ? multiline : false}
      numberOfLines={multiline ? 5 : 1}
    />
  );
};

export default InputField;
