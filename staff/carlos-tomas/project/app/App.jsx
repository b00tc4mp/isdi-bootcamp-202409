import useSession from './view/useSession'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import HomeNavigatorRegular from './view/Navigation/userRegular/HomeNavigatorRegular'
import HomeNavigatorVet from './view/Navigation/userVeterinary/HomeNavigatorVet'
import LoginRegisScreen from './view/Navigation/LoginRegisScreen'



export default function App() {
  const { isLoggedIn, isLoggingVeterinary } = useSession()

  return (
    // <SafeAreaView style={app.droidSafeArea}>
    <>
      <StatusBar style='auto' />

      <NavigationContainer>

        {isLoggedIn ? (isLoggingVeterinary ? <HomeNavigatorVet /> : <HomeNavigatorRegular />) : < LoginRegisScreen />}

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
})
