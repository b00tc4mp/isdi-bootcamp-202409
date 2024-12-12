import { useState, useEffect } from 'react'
import History from './History'

import logic from '../../logic'
import { View, Alert, StyleSheet } from 'react-native'


export default function ListHistory({ type, petId }) {
    const [listHistory, setListHistory] = useState([])


    useEffect(() => {

        const fetchHistoryPets = async () => {
            try {
                const historyData = await logic.getHistoriesPets(type, petId)
                setListHistory(historyData)

            } catch (error) {
                Alert.alert('Error', error.message)
                console.error(error);
            }
        }

        fetchHistoryPets()
    }, [type])


    return (


        <View style={listhistory.view}>
            {listHistory.map(history =>
                <History
                    key={history.id}
                    history={history}
                />
            )}
        </View>
    )
}

const listhistory = StyleSheet.create({

    view: {
        gap: 10,
        padding: 10

    }
})