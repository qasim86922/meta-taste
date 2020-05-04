// import React from "react";
// import { StyleSheet } from "react-native";
// import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

// const Picker = ({ onValueChange, items, placeholder }) => {
//   return (
//     <RNPickerSelect
//       onValueChange={onValueChange}
//       items={items}
//       placeholder={placeholder}
//       style={pickerSelectStyles.inputAndroid}
//     />
//   );
// };

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 2,
//     borderColor: "gray",
//     borderRadius: 4,
//     color: "black",
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 26,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 2,
//     borderColor: "purple",
//     borderRadius: 8,
//     color: "black",
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });

// export default Picker;

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Picker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState("");

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    // setDatePickerVisibility(props.visible);
    setMode(props.mode);
    console.log(props.mode);
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    // hideDatePicker();
    if (mode === "date") {
      props.setDate(date);
    } else {
      props.setTime(date);
    }
  };

  return (
    <View>
      {mode ? (
        <DateTimePickerModal
          isVisible={true}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={() => props.modalHideForDateTime()}
        />
      ) : undefined}
    </View>
  );
};

export default React.memo(Picker);
