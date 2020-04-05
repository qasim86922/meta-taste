import React from "react";
import { TextInput } from "react-native";

const InputField = ({ height, placeholder, onChangeText, width }) => {
  return (
    <TextInput
      style={{
        color:'white',
        height: height,
        width: width,
        borderColor: "gray",
        borderWidth: 2,
        paddingLeft: 15,
        marginTop: 10,
        

      }}
      placeholder={placeholder}
      placeholderTextColor={"black"}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;
