import React from "react";
import HomeStack from "./home.stack";
import { NavigationContainer } from "@react-navigation/native";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
