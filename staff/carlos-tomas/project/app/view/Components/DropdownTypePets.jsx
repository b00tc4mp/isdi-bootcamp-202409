import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

export default function DropdownTypePets({ setVaccine }) {
    const [typeAnimal, setTypeAnimal] = useState(null)
    const [vaccines, setVaccines] = useState({})

    const TypeItem = [
        { label: 'Perro', value: 'dog' },
        { label: 'Gato', value: 'cat' },
        { label: 'Conejo', value: 'rabbit' },
        { label: 'Caballo', value: 'horse' },
        { label: 'Hurones', value: 'ferrets' },
        { label: 'Aves Domésticas', value: 'domestic birds' },
        { label: 'Cerdo', value: 'pig' },
        { label: 'Vaca', value: 'cow' },
        { label: 'Oveja', value: 'sheep' }
    ]

    const VaccinesData = {
        dog: [
            { label: 'Rabia', value: 'rabies' },
            { label: 'Moquillo', value: 'distemper' },
            { label: 'Parvovirus', value: 'parvovirus' }
        ],
        cat: [
            { label: 'Rabia', value: 'rabies' },
            { label: 'Leucemia Felina', value: 'felv' },
            { label: 'Panleucopenia', value: 'panleukopenia' }
        ],
        rabbit: [
            { label: 'Mixomatosis', value: 'myxomatosis' },
            { label: 'RHD', value: 'rhd' }
        ],
        horse: [
            { label: 'Tétanos', value: 'tetanus' },
            { label: 'Virus del Nilo Occidental', value: 'west_nile' },
            { label: 'Encefalomielitis', value: 'encephalomyelitis' }
        ],
        ferrets: [
            { label: 'Rabia', value: 'rabies' },
            { label: 'Moquillo', value: 'distemper' }
        ],
        'domestic birds': [
            { label: 'Newcastle', value: 'newcastle' },
            { label: 'Bronquitis Infecciosa', value: 'bronchitis' }
        ],
        pig: [
            { label: 'Circovirus Porcino', value: 'circovirus' },
            { label: 'Mycoplasma', value: 'mycoplasma' }
        ],
        cow: [
            { label: 'Leptospirosis', value: 'leptospirosis' },
            { label: 'Carbunco Sintomático', value: 'carbunco' }
        ],
        sheep: [
            { label: 'Enterotoxemia', value: 'enterotoxemia' },
            { label: 'Rabia', value: 'rabies' }
        ]
    }

    const handleAnimalChange = (value) => {
        setTypeAnimal(value);
        setVaccines(VaccinesData[value] || []);
    }
    const handleVaccineChange = (selectedVaccine) => {
        setVaccine(selectedVaccine.value)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona un tipo de animal:</Text>
            <Dropdown
                style={styles.dropdown}
                data={TypeItem}
                labelField="label"
                valueField="value"
                placeholder="Selecciona un tipo de animal"
                value={typeAnimal}
                onChange={(item) => handleAnimalChange(item.value)}
            />

            {typeAnimal && (
                <>
                    <Text style={styles.label}>Vacunas disponibles:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={vaccines}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecciona una vacuna"
                        onChange={(item) => handleVaccineChange(item)}
                    />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    dropdown: {
        marginBottom: 16,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16
    }
})
