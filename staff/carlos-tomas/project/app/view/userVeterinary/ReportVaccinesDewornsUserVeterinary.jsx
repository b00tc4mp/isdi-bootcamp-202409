import { useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownTypePets } from '../Components/index'
import { formatDate } from '../../utils/'
import logic from '../../logic'

export default function ReportVaccinesDewornsUserVeterinary({ route }) {
    const { infoPet, reloadPetsData } = route.params;

    const [vaccine, setVaccine] = useState('')
    const [deworn, setDeworn] = useState('')

    const handleUpdatePets = async () => {

        try {
            await logic.updateVaccinesDewornsPet(infoPet.id, vaccine, deworn)
            Alert.alert('Registro de la medicina interna')
            setDeworn('')
            reloadPetsData()
            navigation.navigate('report')
        } catch (error) {
            Alert.alert('Error', error.message)
            console.error(error);
        }
    }

    const handleChangeDeworn = (dewornTypeItem) => {
        setDeworn(dewornTypeItem.value);
    }

    const dewornTypeItem = [
        { label: 'Externo', value: 'external' },
        { label: 'Interno', value: 'internal' },
        { label: 'Ambas', value: 'both' }
    ]

    return (
        <View style={reportVaccinesDeworns.view}>
            <Text>Historial del animal</Text>

            <View style={reportVaccinesDeworns.info}>
                <Text> Nombre del animal: {infoPet.name}</Text>
                <Text>Chip del animal: {infoPet.chip}</Text>
                <Text>Animal estarlizado: {infoPet.sterilized ? 'Si' : 'No'}</Text>
                <Text>Fecha de nacimiento: {infoPet.dateOfBirth}</Text>
                <Text>Vacunas:</Text>
                {infoPet.vaccines && infoPet.vaccines.length > 0 ? (
                    infoPet.vaccines.map((vaccine, index) => (
                        <Text key={index}>- {vaccine.name} ({formatDate(vaccine.date)})</Text>
                    ))
                ) : (
                    <Text>No hay vacunas registradas.</Text>
                )}
                <Text>Desparasitaciones:</Text>
                {infoPet.deworns && infoPet.deworns.length > 0 ? (
                    infoPet.deworns.map((deworm, index) => (
                        <Text key={index}>- {deworm.type} ({formatDate(deworm.date)})</Text>
                    ))
                ) : (
                    <Text>No hay desparasitaciones registradas.</Text>
                )}
            </View>
            <Text>//TODO Nombre del </Text>
            <Dropdown
                style={reportVaccinesDeworns.dropdown}
                data={dewornTypeItem}
                placeholder="Decida qué tipo de desparasitación"
                labelField="label"
                valueField="value"
                value={deworn}
                onChange={handleChangeDeworn}
            />

            <DropdownTypePets setVaccine={setVaccine} />

            <TouchableOpacity
                style={reportVaccinesDeworns.submit}
                onPress={handleUpdatePets}
            >
                <Text>Registrar Medicina preventiva</Text>
            </TouchableOpacity>

        </View >
    )
}


const reportVaccinesDeworns = StyleSheet.create({

    view: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 5
    },
    info: {
        gap: 10,
        borderWidth: 3,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'grey'
    },
    dropdown: {
        height: 50,
        width: 350,
        borderWidth: 2,
        borderRadius: 8,
        padding: 10
    },
    submit: {
        width: 300,
        backgroundColor: "red",
        borderRadius: 45,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    }
})