import { createStackNavigator } from '@react-navigation/stack'
import { Image } from 'react-native'
import LoginScreen from '../LoginScreen'
import RegisterScreen from '../RegisterScreen'


const { Navigator, Screen } = createStackNavigator()

export default function LoginRegisScreen() {
    return (
        <Navigator
            initialRouteName='Login'
            screenOptions={{
                headerTitle: () => (
                    <Image
                        source={require('../../assets/logo.png')} // Ruta a tu logo
                        style={{ width: 120, height: 60, resizeMode: 'contain' }}
                    />
                ),
                headerTitleAlign: 'center',
                headerBackVisible: false
            }}
        >
            <Screen
                name="Login"
                options={{ title: 'Iniciar sesion' }}
                component={LoginScreen}

            />
            <Screen
                name="Register"
                options={{ title: 'Registro' }}
                component={RegisterScreen}
            />
        </Navigator>
    )
}

