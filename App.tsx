import React, { FunctionComponent, useEffect, useState, useRef, Component, useCallback } from 'react';
import { Animated, StyleSheet, PixelRatio, Text, View, Image, PanResponder, Dimensions, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { ContextReplacementPlugin } from 'webpack';
import Constants from 'expo-constants';
import ToDo from './TodoList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import AddItem from './AddItem';
// import {ItemsProvider} from './ItemsState';

function App() {
  const Stack = createStackNavigator();

  return (
    // <ItemsProvider> 
    <NavigationContainer><SafeAreaProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Item" component={AddItem} />
      </Stack.Navigator>
    </SafeAreaProvider></NavigationContainer>
    // </ItemsProvider>
  );

}
export default App;