import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import login from "../components/login";
import signup from "../components/Signup";
import home from "../components/Home";
import reservation from "../components/Reservation";
import list_Restaurant from "../components/List_Restaurant";
import restaurant_Detail from "../components/Restaurant_Detail";
import Order from "../components/Order";
import reserve from "../components/Reserve";
import Meals from "../components/Meals";

import AllRestaurants from "../admin/layouts/AllRestaurants.js";
import AddRestaurant from "../admin/layouts/AddRestaurant.js";
import EditRestaurant from "../admin/layouts/EditRestaurant.js";
import ShowMeals from "../admin/layouts/ShowMeals.js";
import AddMeal from "../admin/layouts/AddMeal.js";
import EditMeal from "../admin/layouts/EditMeal.js";


import AllMealsRes from "../restaurants/layouts/AllMealsRes.js";
import AddMealsRes from "../restaurants/layouts/AddMealsRes.js";
import EditMealsRes from "../restaurants/layouts/EditMealsRes.js";


const RestaurantStack = createStackNavigator(
  {
    AllMealsRes: { screen: AllMealsRes },
    AddMealsRes: { screen: AddMealsRes },
    EditMealsRes: { screen: EditMealsRes },

  },
  {
    initialRouteName: "AllMealsRes",
    headerMode: "none",
    /* if use header The header config from Apps is now here */
  }
);


const AdminStack = createStackNavigator(
  {
    AllRestaurants: {
      screen: AllRestaurants,
    },
  
    AddRestaurant: {
      screen: AddRestaurant,
    },
  
    EditRestaurant: {
      screen: EditRestaurant,
    },
  
    ShowMeals: {
      screen: ShowMeals,
    },
  
    AddMeal: {
      screen: AddMeal,
    },
  
    EditMeal: {
      screen: EditMeal,
    },

  },
  {
    initialRouteName: "AllRestaurants",
    headerMode: "none",
    /* if use header The header config from Apps is now here */
  }
);




const screens = {
  // Login will be first component
  Home: {
    screen: home,
  },
  List_Restaurant: {
    screen: list_Restaurant,
  },
  Restaurant_Detail: {
    screen: restaurant_Detail,
  },
  Orders: {
    screen: Order,
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

  Meals: {
    screen: Meals,
  },

  Reserve: {
    screen: reserve,
  },

  
  RestaurantStack:{
    screen: RestaurantStack
  },

  AdminStack:{
    screen: AdminStack
  }
};



const HomeStack = createStackNavigator(screens, {
  initialRouteName: "Home",
  headerMode: "none",
  /* if use header The header config from Apps is now here */
});

export default createAppContainer(HomeStack);
