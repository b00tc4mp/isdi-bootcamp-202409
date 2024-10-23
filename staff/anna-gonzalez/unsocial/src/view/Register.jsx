import './Register.css'

import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'
import Anchor from '../components/library/Anchor'

import logic from '../logic'

function Register(props) {
    console.log('Register -> render')

    return <main className="Register">
        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                passwordRepeat: { value: passwordRepeat }
            } = form

            try {
                logic.registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegistered()
            }
            catch (error) {
                alert(error.message)
                console.error(error)
            }
        }}>
            <h2>Register</h2>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>
            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>
            <Field>
                <Label htmlFor="passwordRepeat">Confirm password</Label>
                <PasswordInput id="passwordRepeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>
        <Anchor href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</Anchor>
    </main>
}

export default Register