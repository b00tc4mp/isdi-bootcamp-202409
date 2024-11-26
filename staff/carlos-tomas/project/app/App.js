import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.box}><Text>Hello</Text></View>
        <View style={styles.box}><Text>Hello</Text></View>
        <View style={styles.box}><Text>Hello</Text></View>
        <View style={styles.box}><Text>Hello</Text></View>
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",


  },
  box: {
    borderWidth: 1,
    flex: 1,
  }
});
