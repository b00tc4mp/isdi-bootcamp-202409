import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { TextInput as PaperTextInput, Button } from 'react-native-paper'
import registerUser from '../logic/registerUser'
import { useNavigation } from '@react-navigation/native'



export default function Register() {
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const handleRegister = async () => {

        if (!name || !email || !username || !password || !passwordRepeat) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        try {
            await registerUser(name, email, username, password, passwordRepeat)
                .then(() => navigation.navigate('LoginScreen'))
                .catch(err)

        } catch (error) {
            Alert.alert(error.message)
            console.error(error)

        }
    }
    return (
        <>
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
                autoCapitalize='none'
                style={styles.input}
                keyboardType="email-address"
            />
            <PaperTextInput
                label="Username"
                value={username}
                autoCapitalize='none'
                onChangeText={setUsername}
                style={styles.input}
            />
            <PaperTextInput
                label="Password"
                value={password}
                autoCapitalize='none'
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <PaperTextInput
                label="Repeat Password"
                value={passwordRepeat}
                autoCapitalize='none'
                onChangeText={setPasswordRepeat}
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button style={styles.button} onPress={handleRegister} >Register</Button>
            </TouchableOpacity>
        </>
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
        marginLeft: 25,
        marginRight: 25,
    },
    button: {
        margin: 10,
        borderRadius: 50,
        backgroundColor: '#76b5c5',
        width: 200
    }

});
