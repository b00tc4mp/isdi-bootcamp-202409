import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { UpdateProfileUserRegular, ProfileScreenUserRegular } from '../../userRegular/index'

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="ProfileMain"
        >
            <Stack.Screen
                name='ProfileMain'
                component={ProfileScreenUserRegular}
                options={{ title: 'Perfil' }}
            />
            <Stack.Screen
                name='UpdateProfileUserRegular'
                component={UpdateProfileUserRegular}
                options={{ title: 'Actualizar Perfil' }}
            />
        </Stack.Navigator>
    )
}