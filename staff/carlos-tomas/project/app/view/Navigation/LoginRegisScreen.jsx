import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../LoginScreen'
import RegisterScreen from '../RegisterScreen'


const { Navigator, Screen } = createStackNavigator();

export default function LoginRegisScreen({ onLoginSuccess }) {
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
                children={(props) => (
                    <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />)}
            />
            <Screen
                name="register"
                options={{ title: 'Registro' }}
                component={RegisterScreen}
            />
        </Navigator>
    );
}

