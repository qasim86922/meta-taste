import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import TextInput from "../../components/common/TextInput";

import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

import image from "../../assets/foods.jpg";

import { getRestaurants } from "../../actions";

import { Icon } from "react-native-elements";
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

const AllRestaurants = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  const [allRestaurants, setRestaurants] = useState("");

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setErrors] = useState("");

  const apiCall = async () => {
    setLoading(true);
    const data = await getRestaurants();

    if (data.success) {
      setRestaurants(data.data);
      console.log(data.data[0].meals.length);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    apiCall();
  }, []);

  const onPressLogin = async () => {};

  const onPressSignup = async () => {};

  function editRestaurant(itemToEdit) {
    navigation.push("EditRestaurant", { itemToEdit: itemToEdit });
  }

  async function deleteRequest() {
    console.log("called");
  }

  function deleteRestaurant(itemToDelete) {
    console.log(itemToDelete._id);

    AlertFunction(
      "Delete Restaurant",
      `Are you sure want to delete ${itemToDelete.name}?`,
      deleteRequest
    );
  }

  function viewDeals(item) {
    navigation.push("ShowMeals", { selectedResturant: item });
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground source={image} style={styles.image}>
        {!loading ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.push("AddRestaurant")}
                style={{ backgroundColor: "#134B80", borderRadius: 5 }}
              >
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: "3%",
                    paddingVertical: "4%",
                    fontFamily: "Lato-Regular",
                  }}
                >
                  Add Restaurant
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 6 }}>
              <FlatList
                data={allRestaurants}
                keyExtractor={(item, index) => item.name}
                renderItem={(data) => (
                  <TouchableOpacity
                    style={styles.container}
                    // onPress={() => onPressList(data.item)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 4,
                          justifyContent: "center",
                          alignItems: "flex-end",
                        }}
                      >
                        <Image
                          source={{ uri: data.item.image }}
                          style={[styles.img, {}]}
                        />
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <OptionsMenu
                          style={{ marginHorizontal: "10%" }}
                          customButton={myIcon}
                          // buttonStyle={{ width: 102, height: 8, margin: 7.5, resizeMode: "contain" }}
                          destructiveIndex={1}
                          options={[
                            "Edit Restaurant",
                            "Delete Restaurant",
                            "View Meals",
                          ]}
                          actions={[
                            () => editRestaurant(data.item),
                            () => deleteRestaurant(data.item),
                            () => viewDeals(data.item),
                          ]}
                        />
                      </View>
                    </View>

                    <Text
                      style={{
                        fontSize: 22,
                        // fontWeight: "bold",
                        // justifyContent: "center",
                        // color: "green",
                        paddingTop: 10,
                        fontFamily: "Lato-Bold",
                        textAlign: "center",
                      }}
                    >
                      {data.item.name}
                    </Text>

                    <Text
                      style={{
                        // fontSize: 15,
                        justifyContent: "center",
                        // fontWeight: "bold",
                        // padding: 10,
                        marginHorizontal: "3%",
                        marginVertical: "5%",
                        fontFamily: "Lato-Regular",
                        textAlign: "center",
                      }}
                    >
                      {data.item.location}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

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
    // marginTop: 10,
    marginBottom: 20,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 5,
    borderWidth: 0.5,
    marginHorizontal: "3%",
    paddingVertical: "3%",
  },
  img: {
    width: 200,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default AllRestaurants;
