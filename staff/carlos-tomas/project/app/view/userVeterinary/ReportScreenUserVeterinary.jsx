import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import logic from '../../logic'
import { useNavigation } from '@react-navigation/native'



export default function SearchBarExample() {
    const navigation = useNavigation()
    const [search, setSearch] = useState(null)
    const [allData, setAllData] = useState(null)
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
                console.error(error)
            }
        }
        fetchUserData()
    }, [])

    const reloadPetsData = async () => {
        try {
            const data = await logic.getPets()
            setAllData(data)
            setFilteredData(data)
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const handleSearch = (text) => {
        setSearch(text)
        if (text) {
            const newData = allData.filter((item) =>
                item.chip.toLowerCase().includes(text.toLowerCase())
            )
            setFilteredData(newData)
        } else {
            setFilteredData(allData)
        }
    }

    const handleItemPress = (item) => {
        setInfoPet(item)
    }

    return (
        <FlatList
            ListHeaderComponent={() => (
                <TextInput
                    style={report.searchBar}
                    placeholder='Chip del animal'
                    value={search}
                    onChangeText={handleSearch}
                    keyboardType='number-pad'
                />
            )}
            data={filteredData.slice(0, 6)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <View style={report.item}>
                        <Text>Nombre: {item.name}</Text>
                        <Text>Dueño: {item.ownerName}</Text>
                    </View>
                </TouchableOpacity>
            )}
            ListFooterComponent={() => (
                <View style={report.button}>
                    <TouchableOpacity
                        onPress={() => {
                            if (infoPet) {
                                navigation.navigate('report history', { infoPet })
                            } else {
                                Alert.alert('Atención', 'Selecciona a un animal')
                            }
                        }}
                        style={report.touchableOpacity}
                    >
                        <Text style={report.text}>Historial del animal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            if (infoPet) {
                                navigation.navigate('new report', { infoPet, reloadPetsData })
                            } else {
                                Alert.alert('Atención', 'Selecciona a un animal')
                            }
                        }}
                        style={report.touchableOpacity}
                    >
                        <Text style={report.text}>Nuevo reporte</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            if (infoPet) {
                                navigation.navigate('preventive', { infoPet, reloadPetsData })
                            } else {
                                Alert.alert('Atención', 'Selecciona a un animal')
                            }
                        }}
                        style={report.touchableOpacity}
                    >
                        <Text style={report.text}>Medicina preventiva</Text>
                    </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={report.container}
        />
    )
}

const report = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1.5,
        borderBottomColor: '#ddd',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        paddingBottom: 50,
    },
    touchableOpacity: {
        width: 450,
        backgroundColor: '#c1f1cf',
        borderBottomColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 15,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    }
})
