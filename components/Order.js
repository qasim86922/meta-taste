import React from "react";
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

const Order_Detail = (props) => {
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.order}>
        <Text
          style={{
            paddingTop: 10,
            justifyContent: "center",
            fontWeight: "bold",
            color: "green",
            fontSize: 30,
          }}
        >
          Your Order
        </Text>
        <FlatList
          style={styles.flatListStyle}
          data={
            props.navigation.getParam("orderList")
              ? props.navigation.getParam("orderList")
              : []
          }
          keyExtractor={(item, index) => item._id}
          renderItem={(data) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => onPressList(data.item.text)}
            >
              <Text style={{ justifyContent: "center", fontSize: 20 }}>
                {data.item.name}
              </Text>

              <Text style={{ justifyContent: "center", fontSize: 20 }}>
                : {data.item.price}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text
          style={{
            justifyContent: "center",
            flex: 1,
            fontSize: 20,
            color: "green",
            fontWeight: "bold",
          }}
        >
          Total Price: {props.navigation.getParam("totalPrice")}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  order: {
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
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListStyle: {
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

export default Order_Detail;
