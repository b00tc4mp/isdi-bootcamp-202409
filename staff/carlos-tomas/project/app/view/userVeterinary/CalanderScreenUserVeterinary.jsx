import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const MyCalendar = () => {
    const [markedDates, setMarkedDates] = useState({})

    useEffect(() => {
        // Aquí puedes obtener las fechas desde la base de datos
        // Por ejemplo, un array de fechas guardadas:
        const fetchedDates = [
            '2025-01-10',
            '2024-12-18',
            '2024-12-20',
        ]

        // Mapeamos las fechas para que tengan el formato requerido por react-native-calendars
        const marked = fetchedDates.reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: 'red', activeOpacity: 0 }
            return acc
        }, {})

        setMarkedDates(marked);
    }, [])

    return (
        <View>
            <Calendar
                markedDates={markedDates}
                markingType={'dot'}
            />
        </View>
    )
}

export default MyCalendar
