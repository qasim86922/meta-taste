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
  Alert,
} from "react-native";
import TextInput from "../../components/common/TextInput";
import image from "../../assets/foods.jpg";

import { Overlay, Icon } from "react-native-elements";

import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

import OptionsMenu from "react-native-options-menu";

import AlertFunction from "../../components/common/Alert.js";

const myIcon = (
  <Icon
    reverse
    name="ellipsis-v"
    type="font-awesome"
    // color="#517fa4"
    size={17}
  />
);

const Meals = ({ navigation }) => {
  const [inputs, setInputs] = React.useState("");
  const [searchData, setData] = React.useState([]);
  const [restaurantData, setRestaurantData] = React.useState([]);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [selectedResturantIndex, setselectedResturantIndex] = React.useState(
    navigation.getParam("selectedResturant")
  );
  const [idToDelete, setIdToDelete] = React.useState("");

  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  React.useEffect(() => {}, []);

  const onAddMeal = () => {
    navigation.navigate("AddMeal", { selectedRes: selectedResturantIndex });
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

  function editMeal(mealToEdit) {
    navigation.push("EditMeal", {
      mealToEdit: mealToEdit,
      selectedRes: selectedResturantIndex,
    });
  }

  function deleteRequest(id) {
    let temp = [...selectedResturantIndex.meals];

    let removed = temp.filter((item) => {
      return item._id !== id;
    });

    const obj = {
      ...selectedResturantIndex,
      meals: removed,
    };

    console.log(obj);
  }

  function deleteMeal(itemToDelete) {
    console.log(itemToDelete._id);

    Alert.alert(
      "Delete Meal",
      `Are you sure want to delete ${itemToDelete.name}?`,
      [
        {
          text: "No",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deleteRequest(itemToDelete._id),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={{ flex: 1 }}>
        {selectedResturantIndex.meals !== "" ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.button} onPress={onAddMeal}>
                <Text style={{  color: "white", paddingVertical:"2%" }}>Add Meal</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 7 }}>
              <FlatList
                data={selectedResturantIndex.meals}
                keyExtractor={(item, index) => item.name}
                renderItem={(data, index) => (
                  <TouchableOpacity
                    style={[styles.deals, {}]}
                    // onPress={() => onPressList(data.item)}
                  >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ flex: 1 }} />

                      <View style={{ flex: 2, alignItems: "center" }}>
                        <Text
                          style={{
                            // justifyContent: "center",
                            textAlign: "right",
                            fontFamily: "Lato-Bold",
                            color: "green",
                            fontSize: 16,
                          }}
                        >
                          {data.item.mealType.toUpperCase()}
                        </Text>
                        <Text
                          style={{
                            // justifyContent: "center",
                            textAlign: "center",
                            fontFamily: "Lato-Bold",
                            fontSize: 16,
                          }}
                        >
                          {data.item.name}
                        </Text>
                      </View>

                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <OptionsMenu
                          style={{ marginHorizontal: "10%" }}
                          customButton={myIcon}
                          destructiveIndex={1}
                          options={["Edit Meal", "Delete Meal"]}
                          actions={[
                            () => editMeal(data.item),
                            () => deleteMeal(data.item),
                          ]}
                        />
                      </View>
                    </View>

                    <Image
                      source={{ uri: data.item.image.trim() }}
                      style={styles.img}
                    />
                    {/* <Text
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        fontSize: 15,
                        textAlign: "center",
                        fontFamily: "Lato-Regular",
                      }}
                    >
                      {data.item.desc.trim()}
                    </Text> */}
                    <Text
                      style={{
                        justifyContent: "center",
                        fontSize: 15,
                        color: "green",
                        fontFamily: "Lato-Bold",
                        marginVertical: "1%",
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
                        marginVertical: "1%",
                      }}
                    >
                      Price: {data.item.price}
                    </Text>
                  </TouchableOpacity>
                )}
              />
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
    // backgroundColor: "#841584",
    backgroundColor: "#134B80",
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
    // resizeMode: "contain",
  },

  deals: {
    flex: 1,
    paddingVertical: "2%",
    // marginTop: '2%',
    marginBottom: "5%",
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
