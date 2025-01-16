import { useState } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { DatePickerComponent } from '../Components/index'
import logic from '../../logic'

export default function PetsScreenUserVeterinary() {

    const [chip, setChip] = useState(null)
    const [name, setName] = useState(null)
    const [race, setRace] = useState(null)
    const [sex, setSex] = useState(null)
    const [weight, setWeight] = useState(0)
    const [sterilized, setSterilized] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(new Date)

    const handleRegisterAnimal = async () => {
        try {
            await logic.registerPet(chip, name, race, sex, parseInt(weight), sterilized, dateOfBirth)

            Alert.alert('Animal registrado')

            setChip('')
            setName('')
            setRace('')
            setSex(null)
            setWeight(0)
            setSterilized(null)
            setDateOfBirth(new Date())
        } catch (error) {
            Alert.alert(error.message)
            console.error(error)
        }
    }
    const handleDateChange = (selectedDate) => {
        setDateOfBirth(selectedDate.toLocaleDateString());
        console.log("Fecha seleccionada:", selectedDate.toLocaleDateString());
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


                <TextInput
                    style={registerPets.text_input}
                    placeholder='Chip del animal'
                    keyboardType='numeric'
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
                    placeholder='Raza del animal'
                    value={race}
                    onChangeText={setRace}
                />

                <TextInput
                    style={registerPets.text_input}
                    placeholder='Peso del animal'
                    keyboardType='numeric'
                    value={weight}
                    onChangeText={setWeight}
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

    text_dropdown: {
        fontSize: 15
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingTop: 35
    },
    form_dropdown: {
        justifyContent: "center",
        alignItems: "center",
    },
    text_input: {
        borderWidth: 1,
        fontSize: 22,
        width: 450,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#dafbcc'
    },
    dropdown: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 4,
        borderRadius: 8,
        width: 450,
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