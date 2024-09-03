import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationString} from './utils';
import {
  FormScreen,
  ToDoScreen,
  BottomSheetScreen,
  ApiListScreen,
  MainScreen,
  NavigationScreen,
  NavigationDetailsScreen,
} from '../screen';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={navigationString.MainScreen}>
      <Stack.Screen name={navigationString.MainScreen} component={MainScreen} />
      <Stack.Screen name={navigationString.ToDoScreen} component={ToDoScreen} />
      <Stack.Screen
        name={navigationString.BottomSheetScreen}
        component={BottomSheetScreen}
      />
      <Stack.Screen
        name={navigationString.ApiListScreen}
        component={ApiListScreen}
      />
      <Stack.Screen name={navigationString.FormScreen} component={FormScreen} />
      <Stack.Screen
        name={navigationString.NavigationScreen}
        component={NavigationScreen}
      />
      <Stack.Screen
        name={navigationString.NavigationDetailsScreen}
        component={NavigationDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
