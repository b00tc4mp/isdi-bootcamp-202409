import './Login.css'

import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'
import Anchor from '../components/library/Anchor'

import logic from '../logic'

function Login(props) {
    console.log('Login -> render')

    return <main className="Login">
        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                logic.loginUser(username, password)

                form.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }}>
            <h2>Login</h2>

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
        <Anchor href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</Anchor>

    </main>
}

export default Login