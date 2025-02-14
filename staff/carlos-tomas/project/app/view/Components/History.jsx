import { Text, View, StyleSheet } from 'react-native'



export default function History({ history: { veterinary: { name }, type, text, date } }) {

    return (
        <View style={history.view}>
            <Text>Tipo de infome medico: {type}</Text>
            <Text>Veterinaria: {name}</Text>
            <Text>Informe: {text}</Text>
            <Text>Fecha del informe generado {date.split('T')[0]}</Text>
        </View>
    )
}

const history = StyleSheet.create({
    view: {
        borderWidth: 1.5,
        borderRadius: 8,
        padding: 5,
        gap: 10,
        width: 450,
        backgroundColor: '#dafbcc'
    }
})