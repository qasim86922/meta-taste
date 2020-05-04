import React from "react";
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import TextInput from "./common/TextInput";
import image from "../assets/foods.jpg";

import { Overlay } from 'react-native-elements';

import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

import Meals from './Meals.js'

const Reservation = ({ navigation }) => {


  let filteredList = []

  const [inputs, setInputs] = React.useState("");
  const [searchData, setData] = React.useState([]);
  const [restaurantData, setRestaurantData] = React.useState(navigation.getParam("restaurantData", "NOT-FOUND"));
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [selectedResturantIndex, setselectedResturantIndex] = React.useState("");


  const [order, setOrder] = React.useState([]);
  const [totalPrice, setPrice] = React.useState(0);


  let [fontsLoaded] = useFonts({
    'Lato-Light': require('../assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),

  });



  const onPressSearch = async () => {
    console.log(inputs, "in");
  };


  function onPressReserve(selectedResturant) {

    let k = ""
    for (let i = 0; i < restaurantData.length; i++) {
      if (restaurantData[i].name === selectedResturant.name) {
        console.log(i)
        k = i
        // setselectedResturantIndex(i)
        // setmodalVisible(true)
        break;
      }
    }

    if (k !== "") {
      navigation.navigate("Meals", { selectedResturantIndex: restaurantData[k].meals });

    }
  };

  function searchQuery(query) {
    setInputs(query)
  }

  if (inputs) {
    filteredList = []
    for (let i = 0; i < restaurantData.length; i++) {
      if (restaurantData[i].name.toLowerCase().startsWith(inputs.toLowerCase())) {
        filteredList.push(restaurantData[i])
      }
    }
  }

  else if (inputs === "") {
    filteredList = []
  }


  function checkForSelection(id) {
    for (let i = 0; i < order.length; i++) {
      if (order[i]._id === id) {
        return true
      }
    }
    return false

  };


  const onPressOrder = () => {
    console.log("ORDER HIT");
    // props.navigation.navigate("Home", { orderList: order, totalPrice });
  };





  const onPressList = (data) => {

    let temp = order.find(item => { return (item._id === data._id) })

    if (temp) {
      let removed = order.filter(item => { return (item._id !== data._id) })
      setOrder(removed)
      const price = data.price.substring(2).trim();
      setPrice(totalPrice - parseInt(price));
    }

    else {
      setOrder([...order, data]);
      const price = data.price.substring(2).trim();
      setPrice(parseInt(price) + totalPrice);
    }

  };


  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.Reservation}>
        <View style={styles.row}>
          <TextInput
            height={40}
            width="100%"
            placeholder="Search for Restaurants"
            value={inputs}
            onChangeText={(text) => searchQuery(text)}
          />

          {/* <TouchableOpacity style={styles.button} onPress={onPressSearch}>
            <Text style={{ fontSize: 20, color: "white" }}>search</Text>
          </TouchableOpacity> */}
        </View>

        <View style={{ flex: 7 }}>
          {filteredList ? (
            <FlatList
              data={filteredList}
              keyExtractor={(item, index) => item.name}
              renderItem={(data, index) => (
                // <TouchableOpacity
                //   style={styles.container}
                //   onPress={() => onPressReserve(data.item)}
                // >
                //   <Text style={{ justifyContent: "center" }}>
                //     {data.item.text}
                //   </Text>
                //   <Image source={data.item.image} style={styles.img} />
                // </TouchableOpacity>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => onPressReserve(data.item)}
                >
                  <Image source={{ uri: data.item.image }} style={styles.img} />
                  <Text style={{ justifyContent: "center" }}>
                    {data.item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
              <></>
            )}
        </View>
      </View>


      {selectedResturantIndex !== "" ?
        <Overlay
          isVisible={modalVisible}
          // windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="#F8CD1C"
          width="100%"
          height="100%"
          onBackdropPress={() => setmodalVisible(false)}
        >

          {/* <View style={{ flex: 1 }}>

            <View style={{ flex: 7 }}>

              <FlatList
                data={restaurantData[selectedResturantIndex].meals}
                keyExtractor={(item, index) => item.name}
                renderItem={(data, index) => (

                  <TouchableOpacity
                    style={[styles.deals, {
                      backgroundColor: checkForSelection(data.item._id) ? "#F87D1C" : null
                    }]}
                    onPress={() => onPressList(data.item)}
                  >
                    <Text
                      style={{
                        justifyContent: "center",
                        fontFamily: 'Lato-Bold',
                        color: "green",
                        fontSize: 16,
                      }}
                    >
                      {data.item.mealType.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        fontFamily: 'Lato-Bold',
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
                        fontFamily: 'Lato-Regular'
                      }}
                    >
                      {data.item.desc.trim()}
                    </Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        fontSize: 15,
                        color: "green",
                        fontFamily: 'Lato-Bold'

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
                        fontFamily: 'Lato-Bold'

                      }}
                    >
                      Price: {data.item.price}
                    </Text>
                  </TouchableOpacity>

                )}
              />
            </View>

            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={onPressOrder}>
                <Text style={{ fontSize: 20, color: "white" }}>Order</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <Meals selectedResturantIndex={selectedResturantIndex} restaurantData={restaurantData} navigation={navigation} />
        </Overlay>

        : undefined}

    </ImageBackground >
  );
};
export default Reservation;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  Reservation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    // alignItems: "center",
    backgroundColor: "#841584",
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    // width: 150,
    // justifyContent: "center",
    // marginTop: 50,
    borderRadius: 5
  },

  Rbutton: {
    backgroundColor: "green",
    padding: 10,
    justifyContent: "center",

    alignItems: "flex-end",
    height: 40,
    margin: 20,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: '2%',
    // backgroundColor: "red",
    flex: 1
  },
  container: {
    flex: 1,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '20%'
  },
  img: {
    width: 200,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain'
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
});
