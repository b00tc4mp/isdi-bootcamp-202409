import { PasswordInput, Input, Button, Form, Field, Label } from './library/index.js'
//import loginUser from '../logic/user/loginUser.js'
//import registerUser from '../logic/user/registerUser.js'

import logic from '../logic/index.js'

import errors from '../../../com/errors.js' // also index.js //import { errors } from 'com' // check import

const { SystemError } = errors

import useContext from './useContext.js'

export default function Login(props) {
    console.log('Login -> render')

    //const { alert } = useContext() // add latter for custom alert

    const handleSubmit = event => {
        event.preventDefault()

        const { target: {
            username: { value: username },
            password: { value: password } } }
            = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('El servicio no está disponible en estos momentos')
                    else
                        alert(error.message)

                    console.error(error)

                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main>
        <h2>iniciar sesión</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor='username'>Nombre de usuario</Label>
                <Input type='text' id='username'></Input>
            </Field>

            <Field>
                <Label htmlFor='password'>Contraseña</Label>
                <PasswordInput type='password' id='password'></PasswordInput>
            </Field>

            <Button type='submit'>iniciar sesión</Button>
        </Form>
        <a href='' onClick={handleRegisterClick}
            className='ml-4 mt-15 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark'
        >Regístrate</a>
    </main>
}



