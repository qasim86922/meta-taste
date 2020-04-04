import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Signup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
