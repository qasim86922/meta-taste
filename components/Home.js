
import React,{useState} from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground,StyleSheet ,FlatList} from "react-native";
import TextInput from "./common/TextInput";

import image from "../assets/foods.jpg";
const Home = ({navigation}) => {

const   [inputs, setInputs] = React.useState({});
let homeData = [{text:'BreakFast',image:image},{text:'Lunch',image:image},{text:'Dinner',image:image}]

const onPressSearch = async () => {
console.log(inputs,'in')
}
const onPressReservation = async () => {

  navigation.push('Reservation');
}
    return(
        <ImageBackground source={image} style={styles.image}>
        <View style={styles.Home}>
            <View style = {styles.row}> 
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

            <TouchableOpacity style={styles.container} onPress={() => setInputs({ ...inputs, data: data.item })}>
          
            <Text style={{justifyContent:"center"}}>{data.item.text}</Text>
            <Image
              source={data.item.image}
              style={styles.img}
            />
          
          </TouchableOpacity>
         
          )}
          />

   

        </View>
       </ImageBackground>
    )
}
export default Home;


const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
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
      justifyContent:'center',
      width: '30%',
      height:40,
      margin: 10,
    },
    Rbutton: {
        
        backgroundColor: "green",
        padding: 10,
        justifyContent:'center',
       
       alignItems:'flex-end',
        height:40,
        margin: 20
      },
    row:{
        flexDirection:'row',
        
    },
    container: {
       flex: 1,
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center'
        

      },
      img: {
        width: 130,
        height: 70,
        borderRadius:400/2
      }
  });