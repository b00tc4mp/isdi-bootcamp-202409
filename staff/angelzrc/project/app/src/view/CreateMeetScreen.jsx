import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput as PaperTextInput } from 'react-native-paper'
import { useState } from 'react'

export default function CreateMeetScreen() {

    const [interests, setInterests] = useState([''])
    const [trending, setTrending] = useState([''])
    const [location, setLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [address, setAddress] = useState('')
    const [placeName, setPlaceName] = useState('')

    return (
        <View>
            <Text style={styles.title}>Create Meet</Text>

            <PaperTextInput
                label="Interests"
                value={interests}
                onChangeText={setInterests}
                style={styles.input}
            />
            <PaperTextInput
                label="Trending"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                style={styles.input}
                keyboardType="email-address"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
        marginLeft: 25,
        marginRight: 25,
    }
})