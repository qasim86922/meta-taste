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
const Restaurant_Detail = (props) => {
  const [meals, setMeals] = useState([]);
  const [Res_Detail, setDetail] = useState({});
  const [order, setOrder] = useState([]);
  const [totalPrice, setPrice] = useState(0);

  useEffect(() => {
    console.log("MEAL TYPE", props.navigation.getParam("mealType"));
    setDetail(props.navigation.getParam("Res_detail"));
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
      console.log("MEALS", meals);
    }
  };

  const onPressList = (data) => {
    setOrder([...order, data]);
    const price = data.price.substring(2).trim();
    setPrice(parseInt(price) + totalPrice);
  };
  const onPressOrder = () => {
    console.log("ORDER HIT");
    props.navigation.push("Orders", { orderList: order, totalPrice });
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      {Res_Detail ? (
        <View style={styles.LRes}>
          <Text
            style={{
              paddingTop: 5,
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            List of meals {Res_Detail.name} Serves
          </Text>
          <FlatList
            data={meals}
            keyExtractor={(item, index) => item._id}
            renderItem={(data) => (
              <TouchableOpacity
                style={styles.container}
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
                    fontWeight: "bold",
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
                    fontSize: 16,
                  }}
                >
                  {data.item.desc.trim()}
                </Text>
                <Text
                  style={{
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "green",
                  }}
                >
                  Calories: {data.item.calories.toUpperCase()}
                </Text>
                <Text
                  style={{
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "green",
                  }}
                >
                  Price: {data.item.price}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={onPressOrder}>
            <Text style={{ fontSize: 20, color: "white" }}>Order</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>data loading please wait</Text>
      )}
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
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10,
    width: 150,
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
    margin: 3,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
  },
  img: {
    width: 130,
    height: 70,
    borderRadius: 400 / 2,
  },
});
