import { Alert } from "react-native";
export default  (AlertTitle, AlertText, AlertFunction) => {
  return Alert.alert(
    AlertTitle,
    AlertText,
    [
      {
        text: "No",
        // onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
           onPress: () => AlertFunction()
      },
    ],
    { cancelable: false }
  );
};
