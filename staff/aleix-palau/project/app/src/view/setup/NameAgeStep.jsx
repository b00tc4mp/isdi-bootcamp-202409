import { Input, Button, Form, Field, Label } from '../library'

import logic from '../../logic' // getUserName?

import { errors } from 'com'

const { SystemError } = errors

import useContext from './useContext' // per l'alerta de name i age

export default function NameAgeStep(props) {
    console.log('NameAgeStep -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { name: { value: name }, age: { value: age } } } = event

        // try {
        //     logic.
        // }
    }
}