import { StyleSheet } from 'react-native'


const loginScreen = StyleSheet.create({

    form: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        paddingBottom: 120
    },

    text_input: {
        width: 350,
        borderWidth: 1,
        fontSize: 22,
        padding: 16,
        borderRadius: 10
    },

    submit: {
        width: 350,
        backgroundColor: "red",
        borderRadius: 25,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontSize: 35
    },
    textSubmit: {
        fontSize: 20
    }
})

export default loginScreen