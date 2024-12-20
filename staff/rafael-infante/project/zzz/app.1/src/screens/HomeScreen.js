import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen({navigation}) {
  

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Rafael!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  }
})