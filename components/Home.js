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
import { getRestaurants } from "../actions";
import image from "../assets/foods.jpg";

const Home = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({});
  const [restaurantData, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [ filter_data, setFilter_data]= React.useState([]);

  
 
  useEffect(  () => {
    //apiCall();
   
 });
 

  


   apiCall = async () => {
     
    setLoading(true);
    const data = await getRestaurants();
    console.log(data.data,'data')
    if (data.success) {
      setData(data.data);
      setLoading(false);
      console.log(restaurantData,'data of all res')
    }
    console.log(restaurantData,'data of all res')
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
    console.log(inputs, "in",restaurantData);
  };
  const onPressReservation = () => {
    navigation.push("Reservation");
  };

   onPressList = async(data)=>{
   let temp = [];
    const data1 = {
      name: 'Rina’s Kitchenette',
      desc:
        'A trendy eatery which is home to the original Chocolate Toblerone and Caramel Crunch. Their menu has grown over time to offer a variety of cuisines from around the world, be it their Smash Burgers, seasonal beverages or Oriental Bowl.',
      image:
        'https://profiles.pk/wp-content/uploads/2017/12/12998699_10156785158310274_2148234815734048381_n-537x408.jpg',
      location: 'Commercial Area, 242 Y, Sector Y DHA Phase 3, Lahore',
      meals:[
        {   mealType: 'lunch',
        name: 'Mozzarella Sticks',
        desc:
          'An elongated pieces of battered mozzarella, served with signature marinara sauce',
        calories: 'high',
        price: 'Rs 510',
        image:
          'https://images.eatthismuch.com/site_media/img/5651_test_user_fe886342-4fee-4973-87b7-555455f34acd.png',
     }
      ]
    }
    
    temp.push(data1);
   await setData(temp)
    
    console.log(temp,'temp')
   
console.log(restaurantData,'restaurant data')
const filtered_Res= temp.filter(u=>{
  let flag = false;
  u.meals.map(o=>{
     if(o.mealType.toLowerCase()==data.toLowerCase()){
      flag =true
     }
   })
   if(flag){
     return u;
     flag = false
   } 
})
setFilter_data(filtered_Res);

console.log(filtered_Res,'filter')
navigation.push('List_Restaurant',{name: data.toLowerCase(),
  Res_data:filtered_Res
})
  }
  return (
    <ImageBackground source={image} style={styles.image}>
      {restaurantData && !loading ? (
        <View style={styles.Home}>
          <View style={styles.row}>
            <TextInput
              height={40}
              width="60%"
              placeholder="Search"
              onChangeText={(text) => setInputs({ ...inputs, search: text })}
            />

            <TouchableOpacity style={styles.button} onPress={onPressSearch}>
              <Text style={{ fontSize: 20, color: "white" }}>search</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.Rbutton} onPress={onPressReservation}>
            <Text style={{ fontSize: 20, color: "white" }}>Reservation</Text>
          </TouchableOpacity>
          <FlatList
            data={homeData}
            keyExtractor={(item, index) => item.text}
            renderItem={(data) => (
              <TouchableOpacity
                style={styles.container}
                onPress={() => onPressList(data.item.text)}
              >
                <Text style={{ justifyContent: "center" }}>
                  {data.item.text}
                </Text>
                <Image source={{ uri: data.item.image }} style={styles.img} />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <Text>Loading data please wait </Text>
      )}
    </ImageBackground>
  );
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
  },
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 130,
    height: 70,
    borderRadius: 400 / 2,
  },
});
