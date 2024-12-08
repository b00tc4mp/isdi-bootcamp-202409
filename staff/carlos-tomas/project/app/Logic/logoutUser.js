import AsyncStorage from "@react-native-async-storage/async-storage"

const logoutUser = async () => {

    try {
        await AsyncStorage.removeItem('token')

    } catch (error) {
        console.error('error con el token ')
    }
}

export default logoutUser