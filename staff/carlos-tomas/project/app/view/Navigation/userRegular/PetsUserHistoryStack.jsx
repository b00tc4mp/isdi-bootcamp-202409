import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PetsScreenUserRegular, PetsUserHistory } from '../../userRegular/index'


const Stack = createStackNavigator()

export default function PetsUserHistoryStack() {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="info"
        >
            <Stack.Screen
                name='info'
                component={PetsScreenUserRegular}
                options={{ title: 'Informacion Animales' }}
            />
            <Stack.Screen
                name='showPetHistory'
                component={PetsUserHistory}
                options={{ title: 'Historial Animales' }}
            />

        </Stack.Navigator>
    )
}