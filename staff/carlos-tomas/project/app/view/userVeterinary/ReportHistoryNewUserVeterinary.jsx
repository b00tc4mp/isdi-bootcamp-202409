import { useState } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import logic from '../../logic'
import { useNavigation } from '@react-navigation/native'
import { formatDate } from '../../utils'

export default function ReportHistoryNewUserVeterinary({ route }) {
    const { infoPet, reloadPetsData } = route.params

    const navigation = useNavigation()

    const [text, setText] = useState(null)
    const [type, setType] = useState(null)


    const handleChangeType = (typeItem) => {
        setType(typeItem.value)
    }

    const handleRegisterHistoryPet = async () => {
        try {
            await logic.registerHistoryPet(infoPet.id, type, text)

            Alert.alert('Informe registrado')
            reloadPetsData()
            setText(null)
            setType(null)

            navigation.navigate('report')
        } catch (error) {
            Alert.alert(error.message)
            console.error(error)
        }
    }


    const typeItem = [
        { label: 'Medicina interna', value: 'internal_medicine' },
        { label: 'Oftalmologia', value: 'opthalmology' },
        { label: 'Traumatologia', value: 'traumotology' },
        { label: 'Dermatologia', value: 'dermatology' }
    ]


    return (
        <ScrollView>

            < View style={newReport.view} >
                <Text style={newReport.text}>Hisorial del animal</Text>
                <View style={newReport.info}>
                    <Text> Nombre: {infoPet.name}</Text>
                    <Text>Chip: {infoPet.chip}</Text>
                    <Text>Peso: {infoPet.weight}</Text>
                    <Text>Raza: {infoPet.race}</Text>
                    <Text>Sexo: {infoPet.sex ? 'Macho' : 'Hembra'}</Text>
                    <Text>Animal estarlizado: {infoPet.sterilized ? 'Si' : 'No'}</Text>
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

                <View style={newReport.history}>
                    <Text style={newReport.text}>Informe medico nuevo</Text>

                    <Dropdown
                        style={newReport.type}
                        data={typeItem}
                        placeholder='Informe medico'
                        labelField='label'
                        valueField='value'
                        value={type}
                        onChange={handleChangeType}
                    />

                    <TextInput
                        style={newReport.textarea}
                        placeholder='Informe medico'
                        multiline={true}
                        value={text}
                        onChangeText={setText}
                    />
                    <View style={newReport.viewSubmit}>
                        <TouchableOpacity
                            style={newReport.submit}
                            onPress={handleRegisterHistoryPet}
                        >
                            <Text>Registrar historial</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </ScrollView>

    )
}

const newReport = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25
    },
    type: {
        backgroundColor: '#dafbcc',
        width: 450,
        padding: 20,
        borderWidth: 1.5,
    },
    history: {
        padding: 20,
        gap: 25
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
    textarea: {
        height: 250,
        width: 450,
        borderColor: 'black',
        borderWidth: 2,
        textAlignVertical: 'top',
        backgroundColor: '#dafbcc'
    },
    viewSubmit: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    submit: {
        width: 350,
        backgroundColor: '#c1f1cf',
        borderBottomColor: 'black',
        borderWidth: 0.5,
        borderRadius: 25,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

})