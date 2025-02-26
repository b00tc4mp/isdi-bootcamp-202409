import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'


import logic from '../logic'

export default props => {
    console.log('Login -> render')

    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                logic.loginUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                //passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username"></Input>
            </Field>

            <Field>
                <Label htmlFor="password"> Password </Label>
                <PasswordInput id= "password"></PasswordInput>
            </Field>
            
            <Button type="submit">Login</Button>
        </Form>
        

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </main>
}

