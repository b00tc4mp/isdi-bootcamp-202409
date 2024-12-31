import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerComponent({ onDateChange }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);


            if (onDateChange) {
                onDateChange(currentDate);
            }
        } else {
            setShow(false);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={styles.container}>
            <Button onPress={showDatepicker} title="Seleccionar fecha" />
            <Text style={styles.label}>Fecha seleccionada: {date.toLocaleDateString()}</Text>

            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
});
