import logic from '../logic'
import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import { errors } from 'com'

import useContext from './useContext'

const { SystemError } = errors

//Función login, que será nuestra primera pantalla de la aplicación
//export default (props) => {
export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()
                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)

            event.target.password.value = ""
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="Login flex items-center justify-center min-h-screen">
        <div className="container bg-blue-900 p-8 rounded-md">
            <h2 className="text-3xl">Login</h2>

            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" autoComplete="on" />
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" />
                </Field>
                <Button type="submit">Login</Button>
            </Form>

            <a href="" onClick={handleRegisterClick}>Register</a>
        </div>
    </main>
}