import React, { memo, useEffect } from "react";
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import TextInput from "./common/TextInput";
import image from "../assets/foods.jpg";

import { Overlay } from "react-native-elements";

import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

const Meals = ({ navigation }) => {
  const [inputs, setInputs] = React.useState("");
  const [searchData, setData] = React.useState([]);
  const [restaurantData, setRestaurantData] = React.useState([]);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [selectedResturantIndex, setselectedResturantIndex] = React.useState(
    ""
  );
  const [order, setOrder] = React.useState([]);
  const [totalPrice, setPrice] = React.useState(0);

  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  React.useEffect(() => {
    setselectedResturantIndex(navigation.getParam("selectedResturantIndex"));
    // setRestaurantData(navigation.getParam("restaurantData"))
    // console.log(navigation.getParam("selectedResturantIndex"));
  }, []);

  function checkForSelection(id) {
    for (let i = 0; i < order.length; i++) {
      if (order[i]._id === id) {
        return true;
      }
    }
    return false;
  }

  const onPressOrder = () => {
    console.log("ORDER HIT");
    if (totalPrice !== 0) {
      navigation.navigate("Reserve", { selectedMeals: order, totalPrice });
    } else {
      ToastAndroid.showWithGravity(
        "Please select the deals first",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const onPressList = (data) => {
    let temp = order.find((item) => {
      return item._id === data._id;
    });

    if (temp) {
      let removed = order.filter((item) => {
        return item._id !== data._id;
      });
      setOrder(removed);
      const price = data.price.substring(2).trim();
      setPrice(totalPrice - parseInt(price));
    } else {
      setOrder([...order, data]);
      const price = data.price.substring(2).trim();
      setPrice(parseInt(price) + totalPrice);
    }
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={{ flex: 1 }}>
        {selectedResturantIndex !== "" ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 7 }}>
              <FlatList
                data={selectedResturantIndex}
                keyExtractor={(item, index) => item.name}
                renderItem={(data, index) => (
                  <TouchableOpacity
                    style={[
                      styles.deals,
                      {
                        backgroundColor: checkForSelection(data.item._id)
                          ? "#F87D1C"
                          : null,
                      },
                    ]}
                    onPress={() => onPressList(data.item)}
                  >
                    <Text
                      style={{
                        justifyContent: "center",
                        fontFamily: "Lato-Bold",
                        color: "green",
                        fontSize: 16,
                      }}
                    >
                      {data.item.mealType.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        fontFamily: "Lato-Bold",
                        fontSize: 16,
                      }}
                    >
                      {data.item.name}
                    </Text>

                    <Image
                      source={{ uri: data.item.image.trim() }}
                      style={styles.img}
                    />
                    <Text
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        fontSize: 15,
                        textAlign: "center",
                        fontFamily: "Lato-Regular",
                      }}
                    >
                      {data.item.desc.trim()}
                    </Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        fontSize: 15,
                        color: "green",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      Calories: {data.item.calories.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "green",
                        fontFamily: "Lato-Bold",
                      }}
                    >
                      Price: {data.item.price}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.button} onPress={onPressOrder}>
                <Text style={{ fontSize: 20, color: "white" }}>Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};
export default React.memo(Meals);

const styles = StyleSheet.create({
  button: {
    // alignItems: "center",
    backgroundColor: "#841584",
    paddingHorizontal: "10%",
    paddingVertical: "2%",
    // width: 150,
    // justifyContent: "center",
    // marginTop: 50,
    borderRadius: 5,
  },

  img: {
    width: 200,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },

  deals: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 30,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
