import { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import logic from '../../logic'
import QRCode from 'react-native-qrcode-svg'

export default function ProfileScreenUserRegular() {

    const [userInfo, setUserInfo] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fethcUserData = async () => {

            try {
                const paylaod = await logic.QrCodeGeneraitor()
                setUserId(paylaod)

            } catch (error) {
                Alert.alert(error.message)
                console.error(error)
            }

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
            <Text style={profileUser.text}>Nombre: {userInfo.name}</Text>
            <Text style={profileUser.text}>Usuario: {userInfo.username}</Text>
            <Text style={profileUser.text}>Email: {userInfo.email}</Text>
            <Text style={profileUser.text}>Telefono: {userInfo.phone}</Text>

            <QRCode
                value={userId}
                size={125}
            />

        </View >
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
    },

})