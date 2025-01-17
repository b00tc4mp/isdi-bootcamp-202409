import { Text, View, Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { formatDate } from '../../utils/'

export default function PetsScreenUserRegular() {
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
        <View style={styles.container}>
            {userPetsInfo.length > 0 && userPetsInfo.map((pet, index) => (
                <View key={index} style={styles.petCard}>
                    <Text style={styles.text}>Chip: {pet.chip}</Text>
                    <Text style={styles.text}>Nombre: {pet.name}</Text>
                    <Text style={styles.text}>Peso: {pet.weight}</Text>
                    <Text style={styles.text}>Animal: {pet.sterilized ? 'Si' : 'No'}</Text>
                    <Text style={styles.text}>Fecha de nacimiento: {formatDate(pet.dateOfBirth)}</Text>
                    <Text style={styles.text}>Vacunas:</Text>
                    {pet.vaccines && pet.vaccines.length > 0 ? (
                        pet.vaccines.map((vaccine, index) => (
                            <Text key={index} style={styles.text}>- {vaccine.name} ({formatDate(vaccine.date)})</Text>
                        ))
                    ) : (
                        <Text style={styles.text}>No hay vacunas registradas.</Text>
                    )}
                    <Text style={styles.text}>Desparasitaciones:</Text>
                    {pet.deworns && pet.deworns.length > 0 ? (
                        pet.deworns.map((deworm, index) => (
                            <Text key={index} style={styles.text}>- {deworm.type} ({formatDate(deworm.date)})</Text>
                        ))
                    ) : (
                        <Text style={styles.text}>No hay desparasitaciones registradas.</Text>
                    )}
                </View>

            ))}
        </View>
    )
}

const styles = StyleSheet.create({
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
