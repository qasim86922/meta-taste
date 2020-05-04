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

import { getRestaurants } from "../../actions";

const myIcon = (
  <Icon
    reverse
    name="ellipsis-v"
    type="font-awesome"
    // color="#517fa4"
    size={17}
  />
);

const MealsList = (props) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [mealsList, setMealsList] = React.useState("");

  useEffect(() => {
    setMealsList(props.mealsList)
  }, []);

  function editMeal(mealToEdit) {}

  function deleteRequest(id) {}

  function deleteMeal(itemToDelete) {}

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={mealsList}
        keyExtractor={(item, index) => item.name}
        renderItem={(data, index) => (
          <TouchableOpacity
            style={[styles.deals, {}]}
            activeOpacity={1}
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
                    () => props.editMeal(data.item),
                    () => props.deleteMeal(data.item),
                  ]}
                />
              </View>
            </View>

            <Image
              source={{ uri: data.item.image.trim() }}
              style={styles.img}
            />

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
  );
};
export default React.memo(MealsList);

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
