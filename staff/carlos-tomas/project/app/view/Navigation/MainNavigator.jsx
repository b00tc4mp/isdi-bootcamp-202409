import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../HomeScreen'
import ProfileScreen from '../ProfileScreen'
import PetsScreen from '../PetsScreen'
import CalanderSreen from '../CalanderScreen'

const { Navigator, Screen } = createBottomTabNavigator();

export default function MainNavigator() {
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
                    fontSize: 12,
                    paddingBottom: 10
                }
            })}
        >
            <Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'My home', }}
            />
            <Screen
                name="Profile"
                component={ProfileScreen}
            />
            <Screen
                name="Pets"
                component={PetsScreen}
            />
            <Screen
                name="Calendar"
                component={CalanderSreen}
            />
        </Navigator>
    );
}