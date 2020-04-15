import React,{useState} from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground,StyleSheet ,FlatList} from "react-native";
import TextInput from "./common/TextInput";

import image from "../assets/foods.jpg";
const List_Restaurant = ({navigation,name,Res_data}) => {
    console.log(name,Res_data,'00000000000000')
    onPressList = ()=>{}
    return(
        <ImageBackground source={image} style={styles.image}>
               <View style={styles.List}>
                <Text>
                    List of Restaurants that serves {name}
                </Text>
                <FlatList
            data={Res_data}
            keyExtractor={(item, index) => item.name}
            renderItem={(data) => (
              <TouchableOpacity
                style={styles.container}
                onPress={() => onPressList}
              >
                <Text style={{ justifyContent: "center" }}>
                  {data.item.name}
                </Text>
                <Image source={{ uri: data.item.image }} style={styles.img} />
              </TouchableOpacity>
            )}
          />

               </View>
</ImageBackground>
)

}

export default List_Restaurant;

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
      },
  });