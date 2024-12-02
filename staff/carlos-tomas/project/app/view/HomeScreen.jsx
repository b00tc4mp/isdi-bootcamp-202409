import { Text, View, TouchableOpacity } from 'react-native'

import logic from '../logic'



export default function HomeScreen() {
    const handleSubmitLogout = async () => {

        try {
            await logic.logoutUser()


        } catch (error) {
            Alert.alert(error.message);
            console.error(error);
        }
    }

    return (
        <View>
            <Text>Home</Text>

            <TouchableOpacity
                onPress={handleSubmitLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>

        </View>

    )
}