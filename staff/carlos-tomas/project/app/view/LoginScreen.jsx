import logic from '../Logic/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen() {
    async function tryAuthenticate() {
        try {
            const token = await logic.authenticateUser()
            await AsyncStorage.setItem('token', token)
        }
        catch (error) {
            console.error('aaaaaaa')

        }
    }
    return (
        <>
            <View style={loginScreen.header}>
                <Text style={loginScreen.headerTitle}>Care4pets</Text>
            </View>
            <View style={loginScreen.form}>
                <Text>Login</Text>

                <TextInput style={loginScreen.text_input}
                    placeholder='Username' />

                <TextInput style={loginScreen.text_input}
                    secureTextEntry
                    placeholder='Password' />

                <TouchableOpacity style={loginScreen.submit}
                    onPress={() => tryAuthenticate()}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={loginScreen.submit}
                    onPress={async () => Alert.alert(await AsyncStorage.getItem('token'))}>
                    <Text>get token</Text>
                </TouchableOpacity>

            </View>

        </>
    )
}
const loginScreen = StyleSheet.create({
    header: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },

    headerTitle: {
        fontSize: 60,
        color: "white",
    },

    form: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        paddingBottom: 120
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
    }
});