import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import logic from '../logic'

import { errors } from 'com'

const { OwnershipError, CredentialsError, SystemError } = errors

//Función login, que será nuestra primera pantalla de la aplicación
//export default (props) => {
export default function Login(props) {
    console.log('Login -> render')

    const hanleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    alert(error.message)
                    console.error(error)
                    //console.error(new CredentialsError(error.message))
                    return
                }
                event.target.reset()
                props.onLoggedIn()
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
        // try {
        //     logic.loginUser(username, password)

        //     event.target.reset()

        //     props.onLoggedIn()
        // } catch (error) {
        //     alert(error.message)

        //     console.error(error)
        // }
    }

    const handleRegisterClick = event => {
        event.preventDefault()
        props.onNavRegister()
    }

    return <main className="Login">
        <div className="container">
            <h2>Login</h2>

            <Form onSubmit={hanleSubmit}>
                <Field>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" />
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