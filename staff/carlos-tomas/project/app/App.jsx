import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeNavigation from './view/Navigation/HomeNavigation'
import MainNavigator from './view/Navigation/MainNavigator'

export default function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    })();
  }, []);

  console.log(token)

  return (
    // <SafeAreaView style={app.droidSafeArea}>
    <>
      <StatusBar style='auto' />

      <NavigationContainer>
        {
          token ?
            <MainNavigator /> :
            <HomeNavigation />
        }
      </NavigationContainer>
    </>
    // </SafeAreaView>

  );
}

const app = StyleSheet.create({
  droidSafeArea: {
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    flex: 1
  },



});
