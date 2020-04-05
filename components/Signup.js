import React from "react";
import { View, StyleSheet, TouchableOpacity, Text,ImageBackground } from "react-native";
import TextInput from "../components/common/TextInput";
import Picker from "../components/common/Picker";
import image from '../assets/foods.jpg'
import { registerUser } from "../actions";
const Signup = () => {
  const [inputs, setInputs] = React.useState({});
  const [error, setError] = React.useState("");
  const [clicked, setClickNext] = React.useState(false);
  const onPressNext = () => {
    setClickNext(true);
  };
  const onPressSignup = async () => {
    if (inputs && inputs.length !== 14) setError("You must fill all enteries");
    else {
      const res = await registerUser(inputs);
      if (!res.success) setError("Sign up Failed");
    }
  };

  const onPressBackBtn = () => {
    setClickNext(false);
  };

  return !clicked ? (
    <ImageBackground source={image} style={styles.image}>
    <View style={styles.signup}>
      <TextInput
        placeholder="First Name"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, firstName: text })}
      />
      <TextInput
        placeholder="Last Name"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, lastName: text })}
      />
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          height: "10%",
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Age"
          height="100%"
          width="40%"
          onChangeText={(text) => setInputs({ ...inputs, age: text })}
        />
        <TextInput
          placeholder="DOB - DD/MM/YY"
          height="100%"
          width="50%"
          onChangeText={(text) => setInputs({ ...inputs, dob: text })}
        />
      </View>

      <TextInput
        placeholder="City"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, city: text })}
      />
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          height: "10%",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: "45%",
          }}
        >
          <Picker
            items={items}
            placeholder={{
              label: "Medical History",
              value: null,
              color: "#9EA0A4",
            }}
            onValueChange={(value) =>
              setInputs({ ...inputs, medicalHistory: value })
            }
          />
        </View>

        <View style={{ width: "45%" }}>
          <Picker
            items={items}
            placeholder={{
              label: "Area",
              value: null,
              color: "#9EA0A4",
            }}
            onValueChange={(value) => setInputs({ ...inputs, area: value })}
          />
        </View>
      </View>
      <TextInput
        placeholder="Disease"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, disease: text })}
      />
      <TouchableOpacity style={styles.button} onPress={onPressNext}>
        <Text style={{ fontSize: 20, color: "white" }}>Next</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  ) : (
    <ImageBackground source={image} style={styles.image}>
    <View style={styles.signup}>
      {/* <TouchableOpacity style={styles.backButton} onPress={onPressBackBtn}>
        <Text style={{ fontSize: 20, color: "white" }}>Back</Text>
      </TouchableOpacity> */}
      <TextInput
        placeholder="Height"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, height: text })}
      />
      <TextInput
        placeholder="Weight"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, weight: text })}
      />
      <TextInput
        placeholder="Username"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, userName: text })}
      />
      <TextInput
        placeholder="Email"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, email: text })}
      />
      <TextInput
        placeholder="Password"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, password: text })}
      />
      <TextInput
        placeholder="Confirm Password"
        height="10%"
        width="90%"
        onChangeText={(text) => setInputs({ ...inputs, confirmPassword: text })}
      />

      <TouchableOpacity style={styles.button} onPress={onPressSignup}>
        <Text style={{ fontSize: 20, color: "white" }}>Sign up</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={{ color: "red", marginTop: 10, fontSize: 20 }}>
          {error}
        </Text>
      ) : null}
      
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10,
    width: 150,
    marginTop: 10,
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
    justifyContent: "center"
  }
});

const items = [
  { label: "Football", value: "football" },
  { label: "Baseball", value: "baseball" },
  { label: "Hockey", value: "hockey" },
];

export default Signup;
