import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ReporScreentUserVeterinary, ReportHistoryNewUserVeterinary, ReportHistoryUserVeterinary, ReportVaccinesDewornsUserVeterinary } from '../../userVeterinary/index'

const Stack = createStackNavigator();

export default function ReportStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="report"
        >
            <Stack.Screen
                name='report'
                component={ReporScreentUserVeterinary}
                options={{ title: 'Perfil' }}
            />
            <Stack.Screen
                name='report history'
                component={ReportHistoryUserVeterinary}
                options={{ title: 'Actualizar Perfil' }}
            />
            <Stack.Screen
                name='new report'
                component={ReportHistoryNewUserVeterinary}
                options={{ title: 'Nuevo informe' }}
            />
            <Stack.Screen
                name='preventive'
                component={ReportVaccinesDewornsUserVeterinary}
                options={{ title: 'Informe medicina preventiva' }}
            />
        </Stack.Navigator>
    )
}