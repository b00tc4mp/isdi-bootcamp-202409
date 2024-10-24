import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import logic from '../logic'

//Función login, que será nuestra primera pantalla de la aplicación
export default (props) => {
    console.log('Login -> render')

    return <main className="Login">
        <div className="container">
            <h2>Login</h2>

            <Form onSubmit={event => {
                event.preventDefault()

                const { target: { username: { value: username }, password: { value: password } } } = event

                try {
                    logic.loginUser(username, password)

                    event.target.reset()

                    props.onLoggedIn()
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }}>
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

            <a href=""
                onClick={event => {
                    event.preventDefault()

                    props.onNavRegister()
                }}>Register</a>
        </div>
    </main>
}