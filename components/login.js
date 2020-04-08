import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import TextInput from "./common/TextInput";
import FoodIcon from "../assets/food-icon.png";
import { loginUser } from "../actions";
import Wrapper from "./Wrapper";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({});
  const [error, setErrors] = React.useState("");

  const onPressLogin = async () => {
    setErrors("");
    console.log("INPUTS", inputs);
    const res = await loginUser(inputs);
    console.log(res);
    if (!res.success) setErrors("Invalid Email/Password");
    else navigation.push("Home");
  };
  const onPressSignup = async () => {
    navigation.push("SignUp");
  };

  return (
    <View style={styles.login}>
      <Image source={FoodIcon} />
      <TextInput
        height={40}
        width="80%"
        placeholder="Username / Email"
        onChangeText={(text) => setInputs({ ...inputs, email: text })}
      />
      <TextInput
        height={40}
        width="80%"
        placeholder="Password"
        onChangeText={(text) => setInputs({ ...inputs, password: text })}
      />

      <TouchableOpacity style={styles.button} onPress={onPressLogin}>
        <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressSignup}>
        <Text style={{ fontSize: 20, color: "green" }}>
          don't have an account,signup?
        </Text>
      </TouchableOpacity>

      {error ? (
        <Text style={{ color: "red", marginTop: 10, fontSize: 20 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10,
    width: 150,
    marginTop: 10,
  },
});

export default Login;
