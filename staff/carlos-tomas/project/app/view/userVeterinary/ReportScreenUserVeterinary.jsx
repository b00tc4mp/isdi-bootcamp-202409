import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import logic from '../../logic'
import { useNavigation } from '@react-navigation/native'



export default function SearchBarExample() {
    const navigation = useNavigation()

    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [infoPet, setInfoPet] = useState(null)



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await logic.getPets()
                setAllData(data)
                setFilteredData(data)
            } catch (error) {
                Alert.alert('Error', error.message)
                console.error(error);
            }
        };

        fetchUserData()
    }, [])

    const handleSearch = (text) => {
        setSearch(text)

        if (text) {
            const newData = allData.filter((item) =>
                item.chip.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(newData)
        } else {
            setFilteredData(allData)
        }
    }
    const handleItemPress = (item) => {

        setInfoPet(item)
    }
    return (

        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar..."
                value={search}
                onChangeText={handleSearch}
                keyboardType='number-pad'
            />
            <FlatList
                data={filteredData.slice(0, 4)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>

                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                            <Text>{item.owner}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.button}>

                <TouchableOpacity
                    onPress={() => {
                        if (infoPet) {
                            navigation.navigate('report history', { infoPet })
                        } else {
                            Alert.alert('Atención', 'Selecciona a un animal')
                        }
                    }}
                    style={styles.touchableOpacity}
                >
                    <Text>
                        Historial del animal
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (infoPet) {
                            navigation.navigate('new report', { infoPet })
                        } else {
                            Alert.alert('Atención', 'Selecciona a un animal')
                        }
                    }}
                    style={styles.touchableOpacity}
                >
                    <Text>
                        Nuevo report
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        flex: 5,
        paddingBottom: 20
    },
    touchableOpacity: {
        width: 300,
        backgroundColor: "red",
        borderRadius: 45,
        padding: 24,



    }
});
