import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeNavigation from './HomeNavigation'

const { Navigator, Screen } = createStackNavigator();


export default function MyStack() {
    return (

        <Navigator initialRouteName='LoginScreen'>
            <Screen name="LoginScreen" component={LoginScreen} />
            <Screen name="RegisterScreen" component={RegisterScreen} />
        </Navigator>

    )
}
