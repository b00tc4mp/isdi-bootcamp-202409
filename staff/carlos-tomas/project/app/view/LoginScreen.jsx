import useSession from './useSession'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import logic from '../logic'

export default function LoginScreen() {

    const navigation = useNavigation()
    const { setIsLoggedIn, setIsLoggingVeterinary } = useSession()

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmitLogin = async () => {

        try {
            await logic.loginUser(username, password)

            setIsLoggedIn(true)

            const isVeterinary = await logic.isLoggingVet()

            setIsLoggingVeterinary(isVeterinary)

        } catch (error) {
            Alert.alert(error.message)
            console.error(error)
        }
    }

    return (

        <View style={loginScreen.form}>
            <Text
                style={loginScreen.text} >
                Inicar sesion
            </Text>

            <TextInput
                style={loginScreen.text_input}
                placeholder='Nombre usuario'
                autoCapitalize='none'
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={loginScreen.text_input}
                placeholder='Contraseña'
                secureTextEntry
                autoCapitalize='none'
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={loginScreen.submit}
                onPress={handleSubmitLogin}>
                <Text
                    style={loginScreen.textSubmit}>
                    Ingresar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={loginScreen.submit}
                onPress={() => navigation.navigate('Register')}>
                <Text
                    style={loginScreen.textSubmit}>
                    Registro
                </Text>
            </TouchableOpacity>

        </View>


    )
}



const loginScreen = StyleSheet.create({

    form: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        paddingBottom: 120
    },

    text_input: {
        width: 350,
        borderWidth: 1,
        fontSize: 22,
        padding: 16,
        borderRadius: 10
    },

    submit: {
        width: 350,
        backgroundColor: "red",
        borderRadius: 45,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontSize: 35
    },
    textSubmit: {
        fontSize: 20
    }
})
