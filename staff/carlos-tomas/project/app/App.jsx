import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform, } from 'react-native';
import LoginScreen from './view/LoginScreen';


export default function App() {




  return (
    <SafeAreaView style={app.droidSafeArea}>
      <StatusBar style='auto' />
      <LoginScreen />
    </SafeAreaView>

  );
}

const app = StyleSheet.create({
  droidSafeArea: {
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    flex: 1
  },


});
