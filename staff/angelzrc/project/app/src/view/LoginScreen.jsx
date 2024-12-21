import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginUser from '../logic/loginUser';
import { useAuth } from './AuthContext'





export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAuth()
    const navigation = useNavigation()


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }



        try {
            const response = await axios.post('http://192.168.0.25:8080/users/auth', {
                email,
                password,
            });
            console.log(response)
            const token = response.data
            console.log('Token', token)
            AsyncStorage.setItem('token', token)
            setIsLoggedIn(true)
            Alert.alert('Success', 'Logged In', [
                { test: 'OK', onPress: () => console.log('User Logged In!)') }
            ])


        } catch (error) {
            Alert.alert(error.message)
            console.error(error)

        }
    }



    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login</Text>
            <PaperTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                style={styles.input}
            />
            <PaperTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry
            />
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button style={styles.button} onPress={handleLogin}  >Login</Button>
            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => navigation.navigate("RegisterScreen")} style={styles.button}>
                    Register
                </Button>
            </TouchableOpacity>

        </View>)

}
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        /* justifyContent: 'center', */
        /* alignItems: 'center' */
    },
    input: {
        marginBottom: 15,
        marginLeft: 25,
        marginRight: 25,
    },
    button: {
        margin: 10,
        borderRadius: 50,
        backgroundColor: '#76b5c5',
        width: 200
    }
})
