import React, { useState } from "react";
import { StyleSheet, TextInput, Image, Pressable, View } from "react-native";

export default function PasswordInput({ value, onChangeText, placeholder }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={!passwordVisible}
      />
      <Pressable
        onPress={() => {
          setPasswordVisible(!passwordVisible);
        }}
      >
        <Image
          source={
            passwordVisible
              ? require("../../assets/eye-password-open.png")
              : require("../../assets/eye-password-closed.png")
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
    paddingHorizontal: 5,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    // fontSize: 16,
    paddingVertical: 10,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});
