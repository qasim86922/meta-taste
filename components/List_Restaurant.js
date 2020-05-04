import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import TextInput from "./common/TextInput";

import image from "../assets/foods.jpg";

import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';


const List_Restaurant = (props) => {
  const [Res_data, setData] = useState([]);
  let [fontsLoaded] = useFonts({
    'Lato-Light': require('../assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),

  });


  // console.log(props.navigation.getParam("Res_data"), "00000000000000");

  useEffect(() => {
    setData(props.navigation.getParam("Res_data"));

    return () => {
      console.log("unmounted")
    }
  }, []);

  function onPressList(name) {
    console.log(name, "data selected");

    props.navigation.push("Restaurant_Detail", {
      Res_detail: name,
      mealType: props.navigation.getParam("name"),
    });
  };




  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.List}>
        <Text
          style={{
            fontSize: 22,
            // fontWeight: "bold",
            justifyContent: "center",
            paddingTop: '5%',
            marginHorizontal: '5%',
            fontFamily: 'Lato-Bold',
            textAlign: "center"
          }}
        >
          List of Restaurants that serves {props.navigation.getParam("name")}
        </Text>
        <FlatList
          data={Res_data}
          keyExtractor={(item, index) => item.name}
          renderItem={(data) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => onPressList(data.item)}
            >

              <Image source={{ uri: data.item.image }} style={styles.img} />

              <Text
                style={{
                  fontSize: 25,
                  // fontWeight: "bold",
                  justifyContent: "center",
                  // color: "green",
                  paddingTop: 10,
                  fontFamily: 'Lato-Bold',

                }}
              >
                {data.item.name}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  justifyContent: "center",
                  // fontWeight: "bold",
                  // padding: 10,
                  marginHorizontal: '3%',
                  marginVertical: "5%",
                  fontFamily: 'Lato-Regular',
                  textAlign: "center"

                }}
              >
                {data.item.desc}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default List_Restaurant;

const styles = StyleSheet.create({
  List: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10,
    width: 150,

    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 50,
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
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain'
  },
});
