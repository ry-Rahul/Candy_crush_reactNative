import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../utils/NavigationUtil';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="HomeScreen"
          options={{animation: 'fade'}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="LevelScreen"
          options={{animation: 'fade'}}
          component={LevelScreen}
        />
        <Stack.Screen
          name="GameScreen"
          options={{animation: 'fade'}}
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
