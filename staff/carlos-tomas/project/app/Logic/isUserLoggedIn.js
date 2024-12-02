import AsyncStorage from '@react-native-async-storage/async-storage';


const isUserLoggendIn = async () => {

    try {
        const token = await AsyncStorage.getItem('token')
        return token !== null

    } catch (error) {
        console.error('Token no esta')
        return false
    }
}

export default isUserLoggendIn