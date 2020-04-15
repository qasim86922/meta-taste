import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import login from "../components/login";
import signup from "../components/Signup";
import home from "../components/Home";
import reservation from "../components/Reservation";
import reserve from "../components/Reserve";
const screens = {
  // Login will be first component
  Home: {
    screen: home,
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
