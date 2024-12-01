import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, TouchableOpacity } from 'react-native'

export default function HomeScreen() {
    async function logout() {

        await AsyncStorage.removeItem('token')
    }

    return (
        <View>
            <Text>Home</Text>

            <TouchableOpacity
                onPress={() => logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => logout()}>
                <Text>QR</Text>
            </TouchableOpacity>

        </View>

    )
}