import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import axios from 'axios'

const Index = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handleSubmit = async () => {
    if (!name || !email || !username || !password || !passwordRepeat) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    if (password !== passwordRepeat) {
      Alert.alert('Error', 'Passwords does not match')
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.25:8080/', {
        name,
        email,
        username,
        password
      })

      Alert.alert('Success', 'Registration successful', [
        { test: 'OK', onPress: () => console.log('User registeerd') }
      ])

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message)
      Alert.alert('Error', error.message || 'An error ocurred.')
    }

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <PaperTextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <PaperTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <PaperTextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <PaperTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <PaperTextInput
        label="Repeat Password"
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
});

export default Index