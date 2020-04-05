import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";

import Signup from "./components/Signup";
import Navigator from './routes/Routes'
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
