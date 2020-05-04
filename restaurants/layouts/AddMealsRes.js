import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ToastAndroid,
  Picker,
} from "react-native";
import TextInput from "../../components/common/TextInput";

import { CheckBox } from "react-native-elements";

import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

import image from "../../assets/foods.jpg";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddMealsRes = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [selectedRes, setSelectedRes] = useState(
    navigation.getParam("selectedRes")
  );

  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealDesc, setMealDesc] = useState("");
  const [mealImg, setMealImage] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [mealPrice, setMealPrice] = useState("");

  function checkEmpty() {
    if (
      mealName === "" ||
      mealType === "" ||
      mealDesc === "" ||
      mealImg === "" ||
      mealCalories === "" ||
      mealPrice === ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  function onPressAdd() {
    console.log("pressed");
    if (checkEmpty()) {
      ToastAndroid.showWithGravity(
        "Please fill all the fields",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } else {
      const mealObj = {
        mealType: mealType,
        name: mealName,
        desc: mealDesc,
        calories: mealCalories,
        price: mealPrice,
        image: mealImg,
      };

      const resObj = {
        ...selectedRes,
        meals: [...selectedRes.meals, mealObj],
      };
      console.log(resObj.meals);
      navigation.goBack()
    }
  }

  const onPressSignup = async () => {};

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        // style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={{}}
        scrollEnabled={true}
      >
        {/* <ImageBackground source={image} style={styles.image}> */}
        <View
          style={{
            flex: 1,
            // justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Lato-Bold",
              fontSize: 25,
              marginVertical: "4%",
            }}
          >
            Add Meal
          </Text>

          <TextInput
            height={50}
            width="90%"
            placeholder="Meal Name"
            onChangeText={(text) => setMealName(text)}
          />

          <TextInput
            height={50}
            width="90%"
            placeholder="Meal Image Url"
            onChangeText={(text) => setMealImage(text)}
          />

          <TextInput
            height={50}
            width="90%"
            placeholder="Price"
            onChangeText={(text) => setMealPrice(text)}
          />

          <TextInput
            height={70}
            width="90%"
            placeholder="Meal Description"
            onChangeText={(text) => setMealDesc(text)}
            multiline={true}
          />

          <Text
            style={{
              // textAlign: 'left',
              alignSelf: "flex-start",
              fontFamily: "Lato-Bold",
              fontSize: 17,
              marginTop: "5%",
              marginHorizontal: "5%",
            }}
          >
            Meal Type
          </Text>

          <Picker
            selectedValue={mealType}
            style={{ height: "8%", width: "90%" }}
            onValueChange={(itemValue, itemIndex) => setMealType(itemValue)}
          >
            <Picker.Item label="Select Meal Type" value="select type" />
            <Picker.Item label="Breakfast" value="breakfast" />
            <Picker.Item label="Lunch" value="lunch" />
            <Picker.Item label="Dinner" value="dinner" />
            <Picker.Item
              label="Breakfast & Lunch"
              value="breakfast and lunch"
            />
            <Picker.Item
              label="Breakfast & Dinner"
              value="breakfast and dinner"
            />
            <Picker.Item label="Lunch & Dinner" value="lunch and dinner" />
            <Picker.Item
              label="Breakfast, Lunch & Dinner"
              value="breakfast and lunch and dinner"
            />
          </Picker>

          <Text
            style={{
              // textAlign: 'left',
              alignSelf: "flex-start",
              fontFamily: "Lato-Bold",
              fontSize: 17,
              marginTop: "5%",
              marginHorizontal: "5%",
            }}
          >
            Calories
          </Text>

          <Picker
            selectedValue={mealCalories}
            style={{ height: "8%", width: "90%" }}
            // prompt="Select calories level"
            onValueChange={(itemValue, itemIndex) => setMealCalories(itemValue)}
          >
            <Picker.Item label="Select calories level" value="select level" />
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: "35%",
            justifyContent: "center",
            flexDirection: "row-reverse",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={() => onPressAdd()}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "Lato-Regular",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
      </KeyboardAwareScrollView>
    );
  }
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#841584",
    backgroundColor: "#134B80",
    padding: 10,
    width: 150,
    marginTop: 10,
    borderRadius: 5,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default AddMealsRes;
