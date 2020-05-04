import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import TextInput from "./common/TextInput";
import FoodIcon from "../assets/food-icon.png";
import { loginUser } from "../actions";
import Wrapper from "./Wrapper";
import { CheckBox } from "react-native-elements";

import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [inputs, setInputs] = React.useState({});
  const [email, setEmail] = React.useState("res@gmail.com");
  const [password, setPassword] = React.useState("123");

  const [error, setErrors] = React.useState("");

  const [adminUser, setAdminUser] = React.useState(false);
  const [restaurantUser, setRestaurantUser] = React.useState(false);

  const onPressLogin = async () => {
    if (email === "" || password === "") {
      ToastAndroid.showWithGravity(
        "Please fill the fields properly",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } else {
      if (adminUser) {
        if (email === "admin@gmail.com" && password === "123") {
          navigation.push("AdminStack");
        } else {
          ToastAndroid.showWithGravity(
            "Login failed",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }
      } else if (restaurantUser) {
        if (email === "res@gmail.com" && password === "123") {
          navigation.push("RestaurantStack");
        } else {
          ToastAndroid.showWithGravity(
            "Login failed",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }
      } else {
        // setErrors("");
        // console.log("INPUTS", inputs);

        const res = await loginUser({ email: email, password: password });
        console.log(res);
        if (!res.success) setErrors("Invalid Email/Password");
        else navigation.push("Home");
      }
    }
  };

  const onPressSignup = async () => {
    navigation.push("SignUp");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <View
          style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={FoodIcon}
            style={{ resizeMode: "center" }}
            // style={{ width: '20%', height: '100%' }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            height={50}
            width="90%"
            value={email}
            placeholder="Username / Email"
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            height={50}
            width="90%"
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View
          style={{
            flex: 0.7,
            alignItems: "center",
            marginTop: "5%",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: "3%" }}>
            <CheckBox
              title="Login as Admin"
              // iconRight
              checkedColor="#134B80"
              checked={adminUser}
              onPress={() => {
                setAdminUser(!adminUser);
                setRestaurantUser(false);
              }}
              textStyle={{ fontFamily: "Lato-Regular", fontSize: 13 }}
            />
          </View>

          <View style={{ marginTop: "3%" }}>
            <CheckBox
              title="Login as Restaurant"
              // iconRight
              checkedColor="#134B80"
              checked={restaurantUser}
              onPress={() => {
                setRestaurantUser(!restaurantUser);
                setAdminUser(false);
              }}
              textStyle={{ fontFamily: "Lato-Regular", fontSize: 13 }}
            />
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={onPressLogin}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "Lato-Regular",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.4,
            marginTop: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onPressSignup}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Lato-Bold",
                textDecorationLine: "underline",
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* {error ? (
        <Text style={{ color: "red", marginTop: 10, fontSize: 20 }}>
          {error}
        </Text>
      ) : null} */}
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
});

export default Login;
