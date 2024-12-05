import { useState } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { DatePickerComponent } from '../Components/index'
import logic from '../../logic'

export default function PetsScreenUserVeterinary() {

    const [chip, setChip] = useState('')
    const [name, setName] = useState('')
    const [race, setRace] = useState('')
    const [sex, setSex] = useState(null)
    const [weigth, setWeigth] = useState('')
    const [sterilized, setSterilized] = useState(null)
    const [dataOfBirth, setDataOfBirth] = useState(new Date)

    const handleDateChange = (selectedDate) => {
        setDataOfBirth(selectedDate.toLocaleDateString());
        console.log("Fecha seleccionada:", selectedDate.toLocaleDateString());
    }
    const handleRegisterAnimal = async () => {
        try {
            await logic.registerAnimals(chip, name, race, sex, weigth, sterilized, dataOfBirth)


        } catch (error) {
            Alert.alert(error.message)
            console.error(error)
        }
    }
    const handleChangeSex = (sexItem) => {
        setSex(sexItem.value)
    }
    const handleChangeSterilized = (sterilizedItem) => {
        setSterilized(sterilizedItem.value)
    }
    const sexItem = [
        { label: 'Macho', value: true },
        { label: 'Hembra', value: false }
    ]
    const sterilizedItem = [
        { label: 'Esterilizado', value: true },
        { label: 'No esterilizado', value: false }
    ]

    return (

        <ScrollView>

            < View
                style={registerPets.form} >
                <Text
                    style={registerPets.text}>
                    Registro del Animal
                </Text>

                <TextInput
                    style={registerPets.text_input}
                    placeholder='Chip del animal'
                    value={chip}
                    onChangeText={setChip}
                />

                <TextInput
                    style={registerPets.text_input}
                    placeholder='Nombre del animal'
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={registerPets.text_input}
                    placeholder='Raza del animal '
                    value={race}
                    onChangeText={setRace}
                />
                <TextInput
                    style={registerPets.text_input}
                    placeholder='Peso del animal '
                    value={weigth}
                    onChangeText={setWeigth}
                />
                <Text
                    style={registerPets.text_dropdown}>
                    Esterilización del animal ?
                </Text>
                <Dropdown
                    style={registerPets.dropdown}
                    data={sterilizedItem}
                    labelField='label'
                    valueField='value'
                    placeholder='Selecciona una opción'
                    value={sterilized}
                    onChange={handleChangeSterilized}
                />

                <Text
                    style={registerPets.text_dropdown}>
                    Sexo del animal?
                </Text>
                <Dropdown
                    style={registerPets.dropdown}
                    data={sexItem}
                    labelField='label'
                    valueField='value'
                    placeholder='Selecciona una opción'
                    value={sex}
                    onChange={handleChangeSex}
                />
                <DatePickerComponent
                    onDateChange={handleDateChange} />




                <TouchableOpacity
                    style={registerPets.submit}
                    onPress={handleRegisterAnimal}

                >
                    <Text>
                        Register animal
                    </Text>

                </TouchableOpacity>


            </View >
        </ScrollView>




    )
}

const registerPets = StyleSheet.create({

    text: {
        paddingTop: 20,
        fontSize: 30
    },
    text_dropdown: {
        fontSize: 15
    },

    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,

    },
    form_dropdown: {
        justifyContent: "center",
        alignItems: "center",

    },
    text_input: {
        borderWidth: 1,
        fontSize: 22,
        width: 350,
        padding: 16,
        borderRadius: 8
    },
    dropdown: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 4,
        borderRadius: 8,
        width: 350
    },
    label: {
        fontSize: 16,
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