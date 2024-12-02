import AsyncStorage from "@react-native-async-storage/async-storage"



const logoutUser = async () => {

    try {
        await AsyncStorage.removeItem('token')
        console.log('el usuario desconnecto')


    } catch (error) {
        console.error('error con el token ')

    }
}

export default logoutUser