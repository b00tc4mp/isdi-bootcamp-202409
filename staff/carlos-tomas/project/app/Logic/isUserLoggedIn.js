import AsyncStorage from '@react-native-async-storage/async-storage';


const isUserLoggedIn = async () => {

    try {
        const token = await AsyncStorage.getItem('token')
        if (token)
            return true
        else
            return false

    } catch (error) {
        console.error('Token no esta')
        return false
    }
}

export default isUserLoggedIn