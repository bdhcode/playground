import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home.screen";
import ImageSliderOneScreen from "../screens/ImageSliderOne.screen";
import PlaygroundScreen from "../screens/Playground.screen";

const Stack = createNativeStackNavigator();

const AppStackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ImageSliderOne" component={ImageSliderOneScreen} />
      <Stack.Screen name="PlaygroundScreen" component={PlaygroundScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNav;
