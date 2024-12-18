import AsyncStorage from "@react-native-async-storage/async-storage"

export default async () => {

    try {
        await AsyncStorage.removeItem('token')

    } catch (error) {
        console.error('error con el token ')
    }
}

