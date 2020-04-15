import React from "react";
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TextInput from "./common/TextInput";
import image from "../assets/foods.jpg";

const Reservation = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({});

  const [searchData, setData] = React.useState([]);
  const onPressSearch = async () => {
    console.log(inputs, "in");
  };
  const onPressReserve = async () => {
    console.log(inputs, "in");
    navigation.push("Reserve");
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.Reservation}>
        <View style={styles.row}>
          <TextInput
            height={40}
            width="60%"
            placeholder="Search for Restaurants"
            onChangeText={(text) => setInputs({ ...inputs, search: text })}
          />

          <TouchableOpacity style={styles.button} onPress={onPressSearch}>
            <Text style={{ fontSize: 20, color: "white" }}>search</Text>
          </TouchableOpacity>
        </View>
        {searchData.length > 0 ? (
          <FlatList
            data={searchData}
            keyExtractor={(item, index) => item.text}
            renderItem={(data) => (
              <TouchableOpacity
                style={styles.container}
                onPress={() => onPressReserve(data.item)}
              >
                <Text style={{ justifyContent: "center" }}>
                  {data.item.text}
                </Text>
                <Image source={data.item.image} style={styles.img} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
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
