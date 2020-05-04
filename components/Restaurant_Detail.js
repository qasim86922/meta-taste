import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import TextInput from "./common/TextInput";
import image from "../assets/foods.jpg";

import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

import { CheckBox, Overlay } from "react-native-elements";

const Restaurant_Detail = (props) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [meals, setMeals] = useState("");
  const [Res_Detail, setDetail] = useState({});
  const [order, setOrder] = useState([]);
  const [totalPrice, setPrice] = useState(0);
  const [confirmationModel, setConfirmationModel] = useState(false);

  useEffect(() => {
    console.log("MEAL TYPE", props.navigation.getParam("mealType"));
    setDetail(props.navigation.getParam("Res_detail", "NOT-FOUND"));
    setListOfMeals(props.navigation.getParam("Res_detail"));
  }, []);

  const setListOfMeals = (restaurantData) => {
    console.log("RESTAURANT DATA", restaurantData);
    if (restaurantData) {
      const meals = restaurantData.meals.filter((meal) =>
        meal.mealType
          .toLowerCase()
          .includes(props.navigation.getParam("mealType"))
      );
      setMeals(meals);
      // console.log("MEALS", meals);
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

  const onPressOrder = () => {
    if (order.length > 0) {
      setConfirmationModel(true);
    } else {
      ToastAndroid.showWithGravity(
        "Please add some deals first",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  const onConfirmOrder = () => {
    setConfirmationModel(false);
    props.navigation.navigate("Home", { orderList: order, totalPrice });
  };

  function checkForSelection(id) {
    for (let i = 0; i < order.length; i++) {
      if (order[i]._id === id) {
        return true;
      }
    }
    return false;
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      {meals ? (
        <View style={styles.LRes}>
          <View style={{ flex: 0.5, justifyContent: "center" }}>
            <Text
              style={{
                paddingTop: 5,
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              List of meals {Res_Detail.name} serves
            </Text>
          </View>

          <View style={{ flex: 5 }}>
            <FlatList
              data={meals}
              keyExtractor={(item, index) => item._id}
              renderItem={(data) => (
                <TouchableOpacity
                  style={[
                    styles.container,
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
                      fontWeight: "bold",
                      color: "green",
                      fontSize: 16,
                    }}
                  >
                    {data.item.mealType.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      justifyContent: "center",
                      // fontWeight: "bold",
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
                      // fontWeight: "bold",
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

          <View style={{ flex: 0.7, justifyContent: "center" }}>
            <TouchableOpacity style={styles.button} onPress={onPressOrder}>
              <Text
                style={{
                  fontSize: 17,
                  color: "white",
                  fontFamily: "Lato-Regular",
                  paddingVertical: "1%",
                }}
              >
                Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // <Text>data loading please wait</Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={"blue"} />
        </View>
      )}

      <Overlay
        width={"80%"}
        height={"60%"}
        isVisible={confirmationModel}
        onBackdropPress={() => setConfirmationModel(false)}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 4 }}>
              <View style={{ flex: 0.5, justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Lato-Bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  You Ordered
                </Text>
              </View>

              <View
                style={{
                  flex: 3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {order.map((item) => {
                  return (
                    <Text
                      key={item.name}
                      style={{
                        fontFamily: "Lato-Regular",
                        paddingTop: "1%",
                        fontSize: 15,
                      }}
                    >
                      {item.name}
                    </Text>
                  );
                })}
              </View>

              <View style={{ flex: 0.5, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>
                  Total Bill: {totalPrice}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => setConfirmationModel(false)}>
                <Text
                  style={{
                    // fontFamily: "Lato-Bold",
                    fontSize: 16,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onConfirmOrder}>
                <Text
                  style={{
                    fontFamily: "Lato-Bold",
                    fontSize: 18,
                    color: "#134B80",
                    paddingHorizontal: "7%",
                  }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
    </ImageBackground>
  );
};
export default Restaurant_Detail;

const styles = StyleSheet.create({
  LRes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // alignItems: "center",
    backgroundColor: "#134B80",
    paddingHorizontal: "10%",
    paddingVertical: "2%",
    // width: 150,
    // justifyContent: "center",
    // marginTop: 50,
    borderRadius: 5,
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
    margin: 3,
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 30,
  },
  img: {
    marginTop: "3%",
    width: 130,
    height: 70,
    // borderRadius: 400 / 2,
    borderRadius: 10,
  },
});
