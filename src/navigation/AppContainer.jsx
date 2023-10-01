import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import BottomTabs from "./BottomTabs";
import EditNote from "../screens/EditNote";
import HomePage from "../screens/HomePage";

const AppContainer = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TabBar" component={BottomTabs} />
        <Stack.Screen name='EditNote' component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
