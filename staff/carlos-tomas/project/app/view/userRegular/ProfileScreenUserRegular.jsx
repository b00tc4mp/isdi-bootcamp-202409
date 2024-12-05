import { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import logic from '../../logic'
import QRCode from 'react-native-qrcode-svg'

export default function ProfileScreenUserRegular() {

    const [userInfo, setUserInfo] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        console.log('Home render info')
        const fethcUserData = async () => {

            try {
                const paylaod = await logic.QrCodeGeneraitor()
                setUserId(paylaod)

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
            <QRCode
                value={userId}
                size={150}
                color="black"
                backgroundColor="white"
            />
            <Image
                source={{ uri: userInfo.image }}
                style={{ width: 100, height: 100 }}
            />

            <Text> Nombre {userInfo.name}</Text>
            <Text> Email {userInfo.email}</Text>

            <Text>Usarname {userInfo.username}</Text>
            <Text>Telefono {userInfo.phone}</Text>

        </View>

    )
}