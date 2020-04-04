import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import Input from "./TextInputs";

export default class signUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    // TODO: For Firebase athu
    console.log("handleSignUp");
  };
  handleInput = (name, e) => {
    this.setState({ [name]: e });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Image style={{width:50 , height:50}}
        source={require('./logo.jpeg')} /> */}

        <View>
          <Text
            style={{
              color: "green",
              fontSize: 40,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}
          >
            Sign Up
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    color: "black",
  },
  ageContainer: {
    flexDirection: "row",
  },
  age: {
    flex: 2,
  },
  dob: {
    flex: 3,
  },
});
