import { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import logic from '../../logic'



export default function ProfileScreenUserVeterinary() {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
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
        <View style={profileUser.view}>
            <Image style={profileUser.image}
                source={{ uri: userInfo.image }}

            />

            <Text style={profileUser.text}> Nombre: {userInfo.name}</Text>
            <Text style={profileUser.text}> Nombre Usuario: {userInfo.username}</Text>
            <Text style={profileUser.text}> Email: {userInfo.email}</Text>
            <Text style={profileUser.text}>Telefono: {userInfo.phone}</Text>
            <Text style={profileUser.text}>Roll: {userInfo.role}</Text>

        </View>

    )
}

const profileUser = StyleSheet.create({

    view: {
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 80,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3.5,
        borderColor: '#8aee68'
    },
    text: {
        fontSize: 20
    }



})