import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../LoginScreen'
import RegisterScreen from '../RegisterScreen'


const { Navigator, Screen } = createStackNavigator();

export default function LoginRegisScreen() {
    return (
        <Navigator
            initialRouteName='Login'
            screenOptions={{
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
    );
}

