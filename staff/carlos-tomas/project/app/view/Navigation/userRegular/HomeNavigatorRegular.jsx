import useSession from '../../useSession'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, Alert, Image } from 'react-native'

import logic from '../../../logic'

import ProfileStackNavigator from './ProfileStackNavigator'

import { CalanderSreenUserRegular, HomeScreenUserRegular, PetsScreenUserRegular, } from '../../userRegular'


const { Navigator, Screen } = createBottomTabNavigator()

export default function HomeNavigatorRegular() {
    const { setIsLoggedIn, setIsLoggingVeterinary } = useSession()

    const handleLogoutSuccess = async () => {

        try {
            Alert.alert(
                'Cerrar sesión',
                '¿Estás seguro de que deseas salir?',
                [
                    { text: 'Cancelar' },
                    {
                        text: 'Sí, salir',
                        onPress: async () => {
                            await logic.logoutUser()
                            setIsLoggedIn(false)
                            setIsLoggingVeterinary(false)
                        },
                    },
                ],
                { cancelable: true }
            )

        } catch (error) {
            Alert.alert(error.message)
            console.error(error)
        }
    }
    return (
        <Navigator
            screenOptions={({ route }) => ({
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <Image
                        source={require('../../../assets/logo.png')} // Ruta a tu logo
                        style={{ width: 120, height: 60, resizeMode: 'contain' }}
                    />
                ),
                tabBarStyle: {
                    height: 70
                },
                tabBarActiveTintColor: '#FF6347r',
                tabBarInactiveTintColor: '#259447',
                tabBarIcon: ({ color }) => {
                    let iconName

                    if (route.name === 'Profile') {
                        iconName = 'person-outline'
                    } else if (route.name === 'Pets') {
                        iconName = 'paw-outline'
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar-outline'
                    }
                    return <Ionicons name={iconName} size={30} color={color} />
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    paddingBottom: 10
                },
                headerRight: () => (
                    <TouchableOpacity onPress={handleLogoutSuccess}>
                        <Ionicons name='log-out' size={45} color="black" style={{ paddingLeft: 50 }} />
                    </TouchableOpacity>
                )

            })}
        >

            <Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{ title: 'Perfil' }}
            />
            <Screen
                name="Pets"
                component={PetsScreenUserRegular}
                options={{ title: 'Animales' }}
            />
            <Screen
                name="Calendar"
                component={CalanderSreenUserRegular}
                options={{ title: 'Calendario' }}
            />
        </Navigator>
    )
}