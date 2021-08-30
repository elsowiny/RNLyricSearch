import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from "react-native";
import AppLoading from 'expo-app-loading';
import Home from './screens/Home';
import Songlyrics from './screens/Songlyrics';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { 
  useFonts,
  AtomicAge_400Regular 
  
} from '@expo-google-fonts/atomic-age'
import { 
  Audiowide_400Regular 
} from '@expo-google-fonts/audiowide'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Songlyrics} />
    </Stack.Navigator>
  );
}




export default function App() {


  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


