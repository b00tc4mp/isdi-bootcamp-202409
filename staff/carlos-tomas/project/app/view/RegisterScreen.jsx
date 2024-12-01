import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import logic from '../logic'

export default function Register() {

    const navigation = useNavigation()


    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const handleRegister = async () => {

        try {
            await logic.registerUser(name, username, password, phone, email, passwordRepeat)

            navigation.navigate('login')
        } catch (error) {
            Alert.alert(error.message);
            console.error(error);
        }
    }
    return (

        <ScrollView
            contentContainerStyle={signInScreen.scrollView}
        >
            <View
                style={signInScreen.form}>

                <Text>
                    Registro de usuario
                </Text>

                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Name'
                    autoCapitalize='words'
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Username'
                    autoCapitalize='none'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Password repeat'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={passwordRepeat}
                    onChangeText={setPasswordRepeat}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Phone optcional'
                    keyboardType='phone-pad'
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity
                    style={signInScreen.submit}
                    onPress={handleRegister}
                >
                    <Text>
                        Register
                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}
const signInScreen = StyleSheet.create({

    form: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,


    },

    text_input: {
        borderWidth: 1,
        fontSize: 22,
        width: 200,
        padding: 16,
        borderRadius: 8
    },

    submit: {
        width: 200,
        backgroundColor: "red",
        borderRadius: 8,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    scrollView: {
        paddingTop: 100,

    }
});