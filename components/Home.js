import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import TextInput from "./common/TextInput";
import { getRestaurants } from "../actions";
import image from "../assets/foods.jpg";

import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';




const Home = ({ navigation }) => {




  const [inputs, setInputs] = React.useState({});
  const [restaurantData, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filter_data, setFilter_data] = React.useState([]);

  let [fontsLoaded] = useFonts({
    'Lato-Light': require('../assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),

  });


  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoading(true);
    const data = await getRestaurants();

    if (data.success) {
      setData(data.data);
      setLoading(false);
    }

    setLoading(false);
  };

  let homeData = [
    {
      text: "BreakFast",
      image:
        "https://www.cheatsheet.com/wp-content/uploads/2018/02/Sausage-Burrito-640x399.png",
    },
    {
      text: "Lunch",
      image:
        "https://images.eatthismuch.com/site_media/img/5651_test_user_fe886342-4fee-4973-87b7-555455f34acd.png",
    },
    {
      text: "Dinner",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eataly_Las_Vegas_-_Feb_2019_-_Stierch_12.jpg/240px-Eataly_Las_Vegas_-_Feb_2019_-_Stierch_12.jpg",
    },
  ];

  const onPressSearch = async () => {
    console.log(inputs, "in", restaurantData);
  };
  const onPressReservation = () => {
    navigation.push("Reservation", { restaurantData: restaurantData });
  };

  const onPressList = async (data) => {
    console.log("pressed")
    if (restaurantData) {
      setFilter_data([])
      const filtered_Res = restaurantData.filter((u) => {
        let flag = false;
        u.meals.map((o) => {
          if (o.mealType.toLowerCase().includes(data.toLowerCase())) {
            flag = true;
          }
        });
        if (flag) {
          flag = false;
          return u;
        }
      });

      // console.log(filtered_Res)


      // setFilter_data(filtered_Res);

      console.log(filtered_Res, "filter");
      navigation.push("List_Restaurant", {
        name: data.toLowerCase(),
        Res_data: filtered_Res,
      });
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <ImageBackground source={image} style={styles.image}>
        {restaurantData && !loading ? (
          <View style={styles.Home}>
            {/* <View style={styles.row}>

              <TextInput
                height={40}
                width="60%"
                placeholder="Search"
                onChangeText={(text) => setInputs({ ...inputs, search: text })}
              />

              <TouchableOpacity style={styles.button} onPress={onPressSearch}>
                <Text style={{ fontSize: 20, color: "white", fontFamily: 'Lato-Regular' }}>Search</Text>
              </TouchableOpacity>
            </View> */}


            <TouchableOpacity style={styles.Rbutton} onPress={onPressReservation}>
              <Text style={{ fontSize: 20, color: "white" }}>Reservation</Text>
            </TouchableOpacity>

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
              Are you looking to have?
            </Text>

            <FlatList
              data={homeData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.text}
              renderItem={(data) => (
                // <View style={{}}>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => onPressList(data.item.text)}
                >
                  <Image source={{ uri: data.item.image }} style={styles.img} />
                  <Text style={{ justifyContent: "center", fontFamily: "Lato-Bold", fontSize: 15 }}>
                    {data.item.text}
                  </Text>
                </TouchableOpacity>
                // </View>
              )}
            />



            {/* <Overlay
              isVisible={true}
              windowBackgroundColor="rgba(255, 255, 255, .5)"
              overlayBackgroundColor="red"
              width="auto"
              height="auto"
            >
              <Text>Hello from Overlay!</Text>
            </Overlay> */}

          </View>


        ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator color={'blue'} size={'large'} />
            </View>

          )}
      </ImageBackground>
    );
  }
};
export default Home;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  Home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10,
    justifyContent: "center",
    width: "30%",
    height: 40,
    margin: 10,
    borderRadius: 5
  },
  Rbutton: {
    backgroundColor: "#134B80",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "flex-end",
    height: 40,
    margin: 20,
  },
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    marginTop: '15%',
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: '5%'
  },
  img: {
    width: 200,
    height: 100,
    borderRadius: 10,
    // resizeMode:'center'
  },
});
