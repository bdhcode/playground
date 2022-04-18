import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home.screen";
import ImageSliderOneScreen from "../screens/ImageSliderOne.screen";
import CountdownTimerScreen from "../screens/CountdownTimer.screen";

import MaskScreen from "../screens/Mask.screen";

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
      <Stack.Screen
        name="CountdownTimerScreen"
        component={CountdownTimerScreen}
      />
      <Stack.Screen name="MaskScreen" component={MaskScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNav;
