import './Register.css'

import { PasswordInput, Input, Button, Form, Label } from '../components/library'
import logic from '../logic'

function Register(props) {
    return <main className="Register" id="register">
        <h2>REGISTER</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: repeatpassword }
            } = form

            try {
                logic.registerUser(name, email, username, password, repeatpassword)
                form.reset()

                props.onRegistered()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <Label htmlFor="name" >Name</Label>
            <Input type="text" id="name" placeholder="USERNAME" />
            <br />
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" id="email" />

            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" />

            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" />

            <Label htmlFor="password-repeat">Repeat Password</Label>
            <PasswordInput id="password-repeat" />

            <Button type="submit">Register</Button>
        </Form>
        <a href="" onClick={
            event => {
                event.preventDefault()

                props.onLoginClick()
            }}>Login</a>
    </main>
}
export default Register