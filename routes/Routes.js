import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import login from "../components/login";
import signup from "../components/Signup";
import home from "../components/Home";
import reservation from "../components/Reservation";
import list_Restaurant from "../components/List_Restaurant";
import restaurant_Detail from "../components/Restaurant_Detail";
import reserve from "../components/Reserve";
const screens = {
  // Login will be first component
  Home: {
    screen: home,
  },
  List_Restaurant:{
    screen: list_Restaurant,
  },
  Restaurant_Detail:{
    screen:restaurant_Detail,
  },
  Login: {
    screen: login,
  },
  SignUp: {
    screen: signup,
  },

  Reservation: {
    screen: reservation,
  },
  Reserve: {
    screen: reserve,
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
