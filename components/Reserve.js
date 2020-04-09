import React,{useState} from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground,StyleSheet ,FlatList} from "react-native";
import TextInput from "./common/TextInput";

import image from "../assets/foods.jpg";
const Reserve = ({navigation}) => {

const onPressDone = ()=>{

}

    return(
<ImageBackground source={image} style={styles.image}>
      <View style={styles.Reserve}>
      <TextInput
          placeholder="Number of Person"
          height="10%"
          width="90%"
          onChangeText={(text) => setInputs({ ...inputs, totalPerson: text })}
        />
        <TextInput
          placeholder="Arrival Time"
          height="10%"
          width="90%"
          onChangeText={(text) => setInputs({ ...inputs, arrivalTime: text })}
        />
        <TextInput
          placeholder="Date"
          height="10%"
          width="90%"
          onChangeText={(text) => setInputs({ ...inputs, date: text })}
        />
<TextInput
          placeholder="Preferred Table No"
          height="10%"
          width="90%"
          onChangeText={(text) => setInputs({ ...inputs, tableNo: text })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressDone}>
          <Text style={{ fontSize: 20, color: "white" }}>Done</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
}
export default Reserve;


const styles = StyleSheet.create({
    Reserve: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      alignItems: "center",
      backgroundColor: "#841584",
      padding: 10,
      width: 150,
     
      alignItems:'flex-end',
      justifyContent:'center',
      marginTop:50
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
  });