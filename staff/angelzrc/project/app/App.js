import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginNavigator from './src/view/LoginNavigator.js'
import HomeNavigation from './src/view/HomeNavigation.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from './src/view/AuthContext.js'

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}

const MainNavigator = () => {
  const { isLoggedIn } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


