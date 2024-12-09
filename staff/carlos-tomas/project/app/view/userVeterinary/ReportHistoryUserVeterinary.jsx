import { Text, View, StyleSheet } from 'react-native'

export default function ReportHistoryUserVeterinary({ route }) {

    const { infoPet } = route.params

    return (

        <View style={reportHistory.view}>
            <Text>Hisorial del animal</Text>
            <View style={reportHistory.info}>
                <Text> Nombre del animal: {infoPet.name}</Text>
                <Text>Chip del animal: {infoPet.chip}</Text>
                <Text>Raza del animal: {infoPet.race}</Text>
                <Text>Sexo del animal: {infoPet.sex ? 'Macho' : 'Hembra'}</Text>
                <Text>Animal estarlizado: {infoPet.sterilized ? 'Si' : 'No'}</Text>
                <Text>Fecha de nacimiento: {infoPet.dateOfBirth}</Text>
                <Text>Vacunas: {infoPet.vaccines}</Text>
                <Text>Desparasitacion: {infoPet.deworns}</Text>
            </View>

            <View style={reportHistory.history}>
                <Text>Historial del animal</Text>

            </View>



        </View>

    )
}

const reportHistory = StyleSheet.create({


    view: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'


    },
    history: {
        flex: 2
    },
    info: {
        flex: 1,
        gap: 10,
        borderWidth: 3,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'grey'
    }





})