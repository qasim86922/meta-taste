import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Meta Taste App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "green",
  },
  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
});

export default Header;
