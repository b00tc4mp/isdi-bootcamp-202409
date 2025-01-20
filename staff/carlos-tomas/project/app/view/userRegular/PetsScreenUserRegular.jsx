import { Text, View, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { formatDate } from '../../utils/'
import { useNavigation } from '@react-navigation/native'


export default function PetsScreenUserRegular() {

    const navigation = useNavigation()

    const [userPetsInfo, setUserPetsInfo] = useState([])
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userPets = await logic.getUserPets()
                setUserPetsInfo(userPets)
            } catch (error) {
                Alert.alert('Error', error.message)
                console.error(error)
            }
        }

        fetchUserData()
    }, [])

    return (
        <ScrollView>

            < View style={petInfo.container} >
                {
                    userPetsInfo.length > 0 && userPetsInfo.map((pet, index) => (
                        <View key={index} style={petInfo.petCard}>
                            <Text style={petInfo.text}>Chip: {pet.chip}</Text>
                            <Text style={petInfo.text}>Nombre: {pet.name}</Text>
                            <Text style={petInfo.text}>Peso: {pet.weight}</Text>
                            <Text style={petInfo.text}>Animal: {pet.sterilized ? 'Si' : 'No'}</Text>
                            <Text style={petInfo.text}>Fecha de nacimiento: {formatDate(pet.dateOfBirth)}</Text>
                            <Text style={petInfo.text}>Vacunas:</Text>
                            {pet.vaccines && pet.vaccines.length > 0 ? (
                                pet.vaccines.map((vaccine, index) => (
                                    <Text key={index} style={petInfo.text}>- {vaccine.name} ({formatDate(vaccine.date)})</Text>
                                ))
                            ) : (
                                <Text style={petInfo.text}>No hay vacunas registradas.</Text>
                            )}
                            <Text style={petInfo.text}>Desparasitaciones:</Text>
                            {pet.deworns && pet.deworns.length > 0 ? (
                                pet.deworns.map((deworm, index) => (
                                    <Text key={index} style={petInfo.text}>- {deworm.type} ({formatDate(deworm.date)})</Text>
                                ))
                            ) : (
                                <Text style={petInfo.text}>No hay desparasitaciones registradas.</Text>
                            )}
                            <TouchableOpacity

                                style={petInfo.histoy}
                                onPress={() => {
                                    navigation.navigate('showPetHistory', { infoPet: pet })
                                }}
                            >
                                <Text>🪧</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View >
        </ScrollView >
    )
}

const petInfo = StyleSheet.create({
    container: {
        padding: 10,
    },
    petCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 16,
    },
})
