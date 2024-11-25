import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import PasswordInput from "../components/PasswordInput";

import { errors } from "com";

import logic from "../logic";

const { SystemError } = errors;

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleSubmit = () => {
    try {
      logic.registerUser(
        name,
        email,
        username,
        password,
        passwordRepeat,
        (error) => {
          if (error) {
            if (error instanceof SystemError) alert("Sorry, try again later");
            else alert(error.message);

            console.error(error);

            return;
          }

          navigation.navigate("Login");
        }
      );
    } catch (error) {
      Alert.alert(error.message);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
      />
      <PasswordInput
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        style={styles.input}
        placeholder="Repeat password"
      />
      <Button title="Register" onPress={() => navigation.navigate("Login")} />

      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
