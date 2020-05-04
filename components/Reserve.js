import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import TextInput from "./common/TextInput";

import image from "../assets/foods.jpg";

import Picker from "./common/Picker.js";

import { useFonts } from "@use-expo/font";

const Reserve = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [noOfPersons, setnoOfPersons] = React.useState("");
  const [arrivalTime, setArrivalTimeForApi] = React.useState("");
  const [date, setDateForApi] = React.useState("");
  const [tableNo, settableNo] = React.useState("");

  const [selectedMeals, setSelectedMeals] = useState("");

  const [modeForPicker, setModeForPicker] = useState("");

  const [selectedTimeForUser, setSelectedTimeForUser] = useState("");
  const [selectedDateForUser, setSelectedDateForUser] = useState("");

  useEffect(() => {
    setSelectedMeals(navigation.getParam("selectedMeals"));
  }, []);

  function onPressDone() {
    if (
      noOfPersons === "" ||
      arrivalTime === "" ||
      date === "" ||
      tableNo === ""
    ) {
      ToastAndroid.showWithGravity(
        "Please fill the fields properly",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      navigation.navigate("Home");
    }
  }

  function setInputs(value, key) {
    if (key === "noOfPersons") {
      setnoOfPersons(value);
      console.log("called");
    } else if (key === "arrivalTime") {
      setarrivalTime(value);
    } else if (key === "date") {
      setdate(value);
    } else if (key === "tableNo") {
      settableNo(value);
    }
  }

  function setDate(d) {
    setModeForPicker("");

    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var dateStr = date + "/" + month + "/" + year;
    
    setSelectedDateForUser(dateStr);
    setDateForApi(d);
  }

  function setTime(date) {
    setModeForPicker("");
  
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    setSelectedTimeForUser(strTime);
    setArrivalTimeForApi(date);

  }

  function modalShowForDateTime(selectedType) {
    if (selectedType === "date") {
      setModeForPicker("date");
    } else {
      setModeForPicker("time");
    }
  }

  function modalHideForDateTime() {
    setModeForPicker("");
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={-700}
        style={{ flex: 1 }}
      >
        <View style={styles.Reserve}>
          <Text
            style={{
              fontFamily: "Lato-Bold",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Price: {navigation.getParam("totalPrice")}
          </Text>

          <View style={{}}>
            <Text
              style={{
                fontFamily: "Lato-Bold",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Your Selected orders are
            </Text>
            {selectedMeals ? (
              <View>
                {selectedMeals.map((item) => {
                  return (
                    <Text
                      key={item.name}
                      style={{
                        textAlign: "center",
                        fontFamily: "Lato-Regular",
                      }}
                    >
                      {item.name}
                    </Text>
                  );
                })}
              </View>
            ) : undefined}
          </View>

          <TextInput
            placeholder="Number of Person"
            height={40}
            width="90%"
            value={noOfPersons}
            fontSize={20}
            onChangeText={(text) => setInputs(text, "noOfPersons")}
          />

          <TouchableOpacity
            onPress={() => modalShowForDateTime("time")}
            style={{
              height: 40,
              width: "100%",
              marginBottom: 10,
              paddingLeft: 15,
            }}
          >
          
            <Text
              style={{
                color: "black",
                height: "100%",
                width: "95%",
                borderColor: "gray",
                borderWidth: 2,
                paddingLeft: 15,
                marginTop: 10,
                borderRadius: 5,
                textAlignVertical: "center",
              }}
            >
              {selectedTimeForUser ? selectedTimeForUser : "Arrival Time"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => modalShowForDateTime("date")}
            style={{
              height: 40,
              width: "100%",
              marginBottom: 10,
              paddingLeft: 15,
            }}
          >
          

            <Text
              style={{
                color: "black",
                height: "100%",
                width: "95%",
                borderColor: "gray",
                borderWidth: 2,
                paddingLeft: 15,
                marginTop: 10,
                borderRadius: 5,
                textAlignVertical: "center",
              }}
            >
              {selectedDateForUser
                ? selectedDateForUser
                : "Date for Reservation (DD/MM/YYYY)"}
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Preferred Table No"
            // height="10%"
            height={40}
            width="90%"
            value={tableNo}
            onChangeText={(text) => setInputs(text, "tableNo")}
          />
        </View>

        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={() => onPressDone()}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginVertical: "3%",
                marginHorizontal: "10%",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {modeForPicker ? (
        <Picker
          mode={modeForPicker}
          setDate={setDate}
          setTime={setTime}
          modalHideForDateTime={modalHideForDateTime}
        />
      ) : undefined}
    </ImageBackground>
  );
};
export default Reserve;

const styles = StyleSheet.create({
  Reserve: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // alignItems: "center",
    backgroundColor: "#134B80",
    // padding: 10,
    // width: 150,
    borderRadius: 5,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    width: "100%",
    marginTop: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
