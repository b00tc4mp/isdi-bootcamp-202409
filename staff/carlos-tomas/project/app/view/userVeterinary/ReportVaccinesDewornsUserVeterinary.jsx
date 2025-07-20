import { useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownTypePets } from '../Components/index'
import { formatDate } from '../../utils/'
import logic from '../../logic'
import { useNavigation } from '@react-navigation/native'

export default function ReportVaccinesDewornsUserVeterinary({ route }) {
    const navigation = useNavigation()

    const { infoPet, reloadPetsData } = route.params

    const [vaccine, setVaccine] = useState(null)
    const [deworn, setDeworn] = useState(null)

    const handleUpdatePets = async () => {
        try {
            await logic.updateVaccinesDewornsPet(infoPet.id, vaccine, deworn)
            Alert.alert('Registro de la medicina interna')
            setDeworn(null)
            reloadPetsData()
            navigation.navigate('report')
        } catch (error) {
            Alert.alert('Error', error.message)
            console.error(error)
        }
    }

    const handleChangeDeworn = (dewornTypeItem) => {
        setDeworn(dewornTypeItem.value)
    }

    const dewornTypeItem = [
        { label: 'Ninguna', value: null },
        { label: 'Externo', value: 'external' },
        { label: 'Interno', value: 'internal' },
        { label: 'Ambas', value: 'both' }
    ]

    return (
        <View style={reportVaccinesDeworns.view}>
            <Text style={reportVaccinesDeworns.text}>Historial del animal</Text>

            <View style={reportVaccinesDeworns.info}>
                <Text> Nombre: {infoPet.name}</Text>
                <Text>Chip: {infoPet.chip}</Text>
                <Text>Peso: {infoPet.weight}</Text>
                <Text>Animal: {infoPet.sterilized ? 'Si' : 'No'}</Text>
                <Text>Fecha de nacimiento: {formatDate(infoPet.dateOfBirth)}</Text>
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
            <Text style={reportVaccinesDeworns.text}> Medicina preventiva </Text>
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
    text: {
        fontSize: 25
    },
    info: {
        width: 450,
        gap: 5,
        borderWidth: 1.5,
        borderColor: 'black',
        padding: 7,
        borderRadius: 8,
        backgroundColor: '#b7f6a0'
    },
    dropdown: {
        height: 50,
        width: 450,
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#dafbcc'
    },
    submit: {
        width: 350,
        backgroundColor: '#c1f1cf',
        borderBottomColor: 'black',
        borderWidth: 0.5,
        borderRadius: 25,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})