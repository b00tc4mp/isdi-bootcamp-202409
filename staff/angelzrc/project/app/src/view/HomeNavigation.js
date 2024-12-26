import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen.jsx'
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native'
import MapsWeb from './MapsWeb.jsx'
import CreateMeetScreen from './CreateMeetScreen.jsx'



const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator()

export default function MyStack() {


    const HomeTabs = () => {
        return (
            <Tab.Navigator
                initialRouteName='HomeScreen'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'HomeScreen') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Maps') {
                            iconName = focused ? 'map' : 'map-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="MapsWeb" component={MapsWeb} />
            </Tab.Navigator>
        )
    }
    // Web-specific map options or behavior
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name='HomeTabs' components={HomeTabs} options={{ headerShown: false }} />
                <Screen name='CreateMeetScreen' components={CreateMeetScreen} />
            </Navigator>

        </NavigationContainer>

    )
}


