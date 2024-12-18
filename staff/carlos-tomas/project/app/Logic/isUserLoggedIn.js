import AsyncStorage from '@react-native-async-storage/async-storage';


export default async () => {

    let token

    try {
        token = await AsyncStorage.getItem('token')

    } catch (error) {
        console.error('Token no esta')
        return false
    }
    if (token)
        return true
    else
        return false
}

