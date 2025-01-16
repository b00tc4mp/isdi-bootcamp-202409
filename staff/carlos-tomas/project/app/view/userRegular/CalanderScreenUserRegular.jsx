import React, { useState, useEffect } from 'react'
import { Text, View, Modal, Button, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

export default function CalendarScreenUserRegular() {
    const [markedDates, setMarkedDates] = useState({})
    const [selectedDate, setSelectedDate] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const fetchedDates = [
            '2025-01-10',
            '2024-12-18',
            '2024-12-20',
        ]

        const marked = fetchedDates.reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: 'red', activeOpacity: 0 };
            return acc
        }, {})

        setMarkedDates(marked)
    }, [])

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType={'dot'}
                onDayPress={handleDayPress}
            />
            {selectedDate && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Información para la fecha: {selectedDate}
                            </Text>
                            {/* Aquí puedes agregar más información relevante para la fecha */}
                            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
    },
});
