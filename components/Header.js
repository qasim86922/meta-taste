import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';


const Header = () => {

  let [fontsLoaded] = useFonts({
    'Lato-Light': require('../assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),

  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Meta Taste App</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    // height: 60,
    // padding: 15,
    backgroundColor: "#134B80",
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontFamily: 'Lato-Bold'
  },
});

export default Header;
