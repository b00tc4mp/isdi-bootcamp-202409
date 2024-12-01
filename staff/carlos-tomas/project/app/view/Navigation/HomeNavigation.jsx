import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../LoginScreen'
import RegisterScreen from '../RegisterScreen'


const { Navigator, Screen } = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Navigator
            initialRouteName='login'
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false
            }}
        >
            <Screen
                name="login"
                options={{ title: 'Iniciar sesion' }}
                component={LoginScreen}
                screenOptions={{
                    headerBackVisible: false
                }}
            />
            <Screen
                name="register"
                options={{ title: 'Registro' }}
                component={RegisterScreen}
            />
        </Navigator>
    );
}

