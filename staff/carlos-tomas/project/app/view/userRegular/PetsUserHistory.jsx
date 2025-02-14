import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import ListHistory from '../Components/ListHistory'
import { formatDate } from '../../utils'

export default function PetsUserHistory({ route }) {
    const { infoPet } = route.params

    const [reportType, setReportType] = useState(null)

    const handleChangeReportType = (reportTypeItem) => {
        setReportType(reportTypeItem.value)
    }

    const reportTypeItem = [
        { label: 'Medicina interna', value: 'internal_medicine' },
        { label: 'Oftalmologia', value: 'opthalmology' },
        { label: 'Traumatologia', value: 'traumotology' },
        { label: 'Dermatologia', value: 'dermatology' }
    ]

    return (

        <ScrollView>

            <View style={reportHistory.view}>
                <Text style={reportHistory.text}>Hisorial del animal</Text>
                <View style={reportHistory.info}>
                    <Text> Nombre: {infoPet.name}</Text>
                    <Text>Chip: {infoPet.chip}</Text>
                    <Text>Peso: {infoPet.weight}</Text>
                    <Text>Raza: {infoPet.race}</Text>
                    <Text>Sexo: {infoPet.sex ? 'Macho' : 'Hembra'}</Text>
                    <Text>Estarlizado: {infoPet.sterilized ? 'Si' : 'No'}</Text>
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

                <View style={reportHistory.history}>
                    <Text style={reportHistory.text}>Escoga el tipo de informe</Text>
                    <Dropdown
                        style={reportHistory.dropdown}
                        data={reportTypeItem}
                        placeholder='Tipo de informe medico'
                        labelField='label'
                        valueField='value'
                        value={reportType}
                        onChange={handleChangeReportType}
                    />
                </View>
                {reportType ? (
                    <ListHistory type={reportType} petId={infoPet.id} />
                ) : (
                    <Text>Por favor escoja qué tipo de historial quieres ver.</Text>
                )}
            </View>

        </ScrollView>
    )
}

const reportHistory = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25
    },
    history: {
        padding: 20,
        gap: 10,
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
        borderWidth: 1.5,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#dafbcc'
    }
})