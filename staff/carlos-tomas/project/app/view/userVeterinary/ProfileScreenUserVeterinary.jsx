import { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import logic from '../../logic'



export default function ProfileScreenUserVeterinary() {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        console.log('Home render info')
        const fethcUserData = async () => {

            try {
                const user = await logic.getUser()
                setUserInfo(user)

            } catch (error) {
                Alert.alert(error.message)
                console.error(error)
            }
        }
        fethcUserData()
    }, [])

    if (!userInfo) {
        return (

            <Text>Loading</Text>
        )
    }

    return (
        <View>
            <Image
                source={{ uri: userInfo.image }}
                style={{ width: 100, height: 100 }}
            />

            <Text> Nombre {userInfo.name}</Text>
            <Text> Email {userInfo.email}</Text>
            <Text> Roll {userInfo.username}</Text>
            <Text> Email {userInfo.role}</Text>
            <Text>Telefono {userInfo.phone}</Text>

        </View>

    )
}