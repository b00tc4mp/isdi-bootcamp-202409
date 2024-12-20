import React, { useState } from "react";
import { StyleSheet, TextInput, View, Pressable, Image } from "react-native";

export default function PasswordInput({ value, onChangeText, style }) {
  const [passwordVisible, setPasswordVisible] = useState(false); // Controla visibilidad de la contraseña

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value} // Recibe el valor desde el padre
        onChangeText={onChangeText} // Actualiza el valor en el padre
        secureTextEntry={!passwordVisible} // Cambia visibilidad
      />
      <Pressable
        onPress={() => setPasswordVisible(!passwordVisible)} // Alterna la visibilidad
        style={styles.eyeButton}
      >
        <Image
          source={
            passwordVisible
              ? require("../../assets/eye.png")
              : require("../../assets/hide.png")
          }
          style={styles.eyeIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
});