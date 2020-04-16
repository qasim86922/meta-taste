import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, StyleSheet, FlatList } from "react-native";
import TextInput from "./common/TextInput";
import image from "../assets/foods.jpg";
const Restaurant_Detail = (props) => {
    const [meals, setMeals] = useState([])

    const [Res_Detail, setDetail] = useState({})

    useEffect(() => {
        setDetail(props.navigation.getParam('Res_detail'));

    });

    onPressList = (data) => {

        setMeals({ ...meals, data })
    }
    // onPressOrder = () => {
    //     console.log(meals, '----meals')
    // }
    return (
        <ImageBackground source={image} style={styles.image}>
            {Res_Detail ?
                <View style={styles.LRes}>
                    <Text>List of meals {Res_Detail.name} Serves </Text>
                    <FlatList

                        data={Res_Detail.meals}
                        keyExtractor={(item, index) => item.name}
                        renderItem={(data) => (
                            <TouchableOpacity
                                style={styles.container}
                                onPress={() => onPressList(data.item)}
                            >
                                <Text style={{ justifyContent: "center" }}>
                                   Meal Type: {data.item.mealType}
                                </Text>
                                <Text style={{ justifyContent: "center" }}>
                                    {data.item.name}
                                </Text>
                                <Text style={{ justifyContent: "center" }}>
                                    {data.item.desc}</Text>
                                <Text style={{ justifyContent: "center" }}>
                                   Calories: {data.item.calories}</Text>
                                <Text style={{ justifyContent: "center" }}>
                                   price: {data.item.price}</Text>


                                <Image source={{ uri: data.item.image }} style={styles.img} />
                            </TouchableOpacity>
                        )}
                    />
                    {/* <TouchableOpacity style={styles.button} onPress={()=>onPressOrder}>
              <Text style={{ fontSize: 20, color: "white" }}>Order</Text>
            </TouchableOpacity> */}
                </View>
                : <Text>data loading please wait</Text>}
        </ImageBackground>
    )
}
export default Restaurant_Detail;


const styles = StyleSheet.create({
    LRes: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#841584",
        padding: 10,
        width: 150,

        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: 50
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