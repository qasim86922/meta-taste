import API from "../utils/axios";

// Login User
export const loginUser = async (data) => {
  try {
    console.log("REACHED hERE");
    console.log("data", data);
    const res = await API.post("/auth/login", data);

    console.log(res);
    // const res = await axios.post(
    //   "http://10.0.2.2:5010/api/v1/auth/login",
    //   data
    // );

    return res.data;
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return { success: false };
  }
};

// Register User
export const registerUser = async (data) => {
  try {
    const updatedData = { ...data, role: "user" };
    console.log(updatedData);
    const res = await API.post("/auth/register", updatedData);
    console.log("Success");

    return res.data;
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    console.log(err);

    console.log("Failure");
    return { success: false };
  }
};

// Get Restaurants
export const getRestaurants = async () => {
  try {
    const res = await API.get("/restaurant");
    console.log("SUCCESS");
    return res.data;
  } catch (err) {
    console.log("ERROR MESSAGE", err.message);
    console.log(err);

    console.log("Failure");
    return { success: false };
  }
};
