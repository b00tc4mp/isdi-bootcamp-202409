import useSession from '../../useSession'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, Alert } from 'react-native'

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
                tabBarStyle: { height: 70 },
                tabBarActiveTintColor: '#FF6347',
                tabBarInactiveTintColor: '#888888',
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Pets') {
                        iconName = 'paw-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar-outline';
                    }
                    return <Ionicons name={iconName} size={28} color={color} />;
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
                name="Home"
                component={HomeScreenUserRegular}
                options={{ title: 'Home' }}
            />
            <Screen
                name="Profile"
                component={ProfileStackNavigator}
            />
            <Screen
                name="Pets"
                component={PetsScreenUserRegular}
            />
            <Screen
                name="Calendar"
                component={CalanderSreenUserRegular}
            />
        </Navigator>
    );
}