import { useState } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import logic from '../../logic'
import { useNavigation } from '@react-navigation/native'

export default function ReportHistoryNewUserVeterinary({ route }) {
    const { infoPet } = route.params

    const navigation = useNavigation()

    const [text, setText] = useState('')
    const [type, setType] = useState('')


    const handleChangetype = (typeItem) => {
        setType(typeItem.value)
    }

    const handleRegisterHistoryPet = async () => {
        try {
            await logic.registerHistoryPet(infoPet.id, type, text)


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
                <Text>Hisorial del animal</Text>
                <View style={newReport.info}>
                    <Text> Nombre del animal: {infoPet.name}</Text>
                    <Text>Chip del animal: {infoPet.chip}</Text>
                    <Text>Raza del animal: {infoPet.race}</Text>
                    <Text>Sexo del animal: {infoPet.sex ? 'Macho' : 'Hembra'}</Text>
                    <Text>Animal estarlizado: {infoPet.sterilized ? 'Si' : 'No'}</Text>
                    <Text>Fecha de nacimiento: {infoPet.dateOfBirth}</Text>
                    <Text>Vacunas: {infoPet.vaccines}</Text>
                    <Text>Desparasitacion: {infoPet.deworns}</Text>
                </View>

                <View style={newReport.history}>
                    <Text>Informe medico nuevo</Text>

                    <Dropdown
                        style={newReport.type}
                        data={typeItem}
                        placeholder='Informe medico'
                        labelField='label'
                        valueField='value'
                        value={type}
                        onChange={handleChangetype}
                    />

                    <TextInput
                        style={newReport.textarea}
                        placeholder='Informe medico'
                        multiline={true}
                        value={text}
                        onChangeText={setText}
                    />

                    <TouchableOpacity
                        style={newReport.submit}
                        onPress={handleRegisterHistoryPet}
                    >
                        <Text>Registrar historial</Text>

                    </TouchableOpacity>



                </View>
            </View >
        </ScrollView>

    )
}

const newReport = StyleSheet.create({


    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'


    },
    history: {
        flex: 1,
        padding: 20,
        gap: 15
    },
    info: {

        gap: 10,
        borderWidth: 3,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'grey'
    },

    type: {

    },

    textarea: {
        height: 250,
        width: 400,
        borderColor: 'gray',
        borderWidth: 2,
        textAlignVertical: 'top'
    },
    submit: {
        width: 300,
        backgroundColor: "red",
        borderRadius: 45,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },

})