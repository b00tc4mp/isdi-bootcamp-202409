import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './view/Navigation/MainNavigator'
import LoginRegisScreen from './view/Navigation/LoginRegisScreen'
import logic from './logic'
import { useState, useEffect } from 'react'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkUserStatus = async () => {
      const loggedIn = await logic.isUserLoggendIn()

      setIsLoggedIn(loggedIn)
    }

    checkUserStatus()
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
    // <SafeAreaView style={app.droidSafeArea}>
    <>
      <StatusBar style='auto' />

      <NavigationContainer>

        {isLoggedIn ? <MainNavigator /> : < LoginRegisScreen onLoginSuccess={handleLoginSuccess} />}

      </NavigationContainer>
    </>
    // </SafeAreaView>
  )
}

const app = StyleSheet.create({
  droidSafeArea: {
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    flex: 1
  },



});
