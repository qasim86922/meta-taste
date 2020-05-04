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

const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [resName, setRestaurantName] = useState("");
  const [resImg, setImage] = useState("");
  const [resLoc, setLocation] = useState("");
  const [resDesc, setDesc] = useState("");

  const [resToEdit, setResToEdit] = useState(navigation.getParam("itemToEdit"));

  useEffect(() => {
    // setResToEdit(navigation.getParam("itemToEdit"));

    setRestaurantName(resToEdit.name);
    setImage(resToEdit.image);
    setLocation(resToEdit.location);
    setDesc(resToEdit.desc);
  }, []);

  function checkEmpty() {
    if (resName === "" || resImg === "" || resLoc === "" || resDesc === "") {
      return true;
    } else {
      return false;
    }
  }

  function onPressEdit() {
    if (checkEmpty()) {
      ToastAndroid.showWithGravity(
        "Please fill all the fields",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } else {
      const resObj = {
        name: resName,
        desc: resDesc,
        image: resImg,
        location: resLoc,
        meals: [...resToEdit.meals],
      };
      // console.log(resObj);
      navigation.goBack();
    }
  }

  const onPressSignup = async () => {};

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        style={{}}
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={{height:'100%'}}
        // scrollEnabled={true}
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
            Edit Restaurant
          </Text>
          <TextInput
            height={50}
            value={resName}
            width="90%"
            placeholder="Restaurant Name"
            onChangeText={(text) => setRestaurantName(text)}
          />
          <TextInput
            height={50}
            width="90%"
            value={resImg}
            placeholder="Image Url"
            onChangeText={(text) => setImage(text)}
          />
          <TextInput
            height={50}
            width="90%"
            value={resLoc}
            placeholder="Location"
            onChangeText={(text) => setLocation(text)}
          />
          <TextInput
            height={"40%"}
            width="90%"
            value={resDesc}
            placeholder="Description"
            onChangeText={(text) => setDesc(text)}
            multiline={true}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: "35%",
            justifyContent: "center",
            flexDirection: "row-reverse",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={() => onPressEdit()}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "Lato-Regular",
              }}
            >
              Edit
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
    // flex: 1,
    // maxHeight:'100%',
    resizeMode: "cover",
    // justifyContent: "center",
  },
});

export default Login;
