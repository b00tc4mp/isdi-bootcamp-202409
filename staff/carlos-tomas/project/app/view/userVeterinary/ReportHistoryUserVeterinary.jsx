import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import ListHistory from '../Components/ListHistory'
import { formatDate } from '../../utils'

export default function ReportHistoryUserVeterinary({ route }) {
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
                <Text>Hisorial del animal</Text>
                <View style={reportHistory.info}>
                    <Text> Nombre del animal: {infoPet.name}</Text>
                    <Text>Chip del animal: {infoPet.chip}</Text>
                    <Text>Peso del animal: {infoPet.weight}</Text>
                    <Text>Raza del animal: {infoPet.race}</Text>
                    <Text>Sexo del animal: {infoPet.sex ? 'Macho' : 'Hembra'}</Text>
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

                <View style={reportHistory.history}>
                    <Text>Historial del animal</Text>
                    <Text>Escoga el tipo de informe</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    history: {
        flex: 1,
        padding: 20,
        gap: 15,

    },
    info: {
        flex: 1,
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
    }

})