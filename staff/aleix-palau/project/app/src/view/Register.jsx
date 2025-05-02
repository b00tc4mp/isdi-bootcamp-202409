import { PasswordInput, Input, PrimaryButton, Form, Field, Label } from './library'
import logic from '../logic'
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors

export default function Register(props) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const {
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(email, password, passwordRepeat)
                .then(() => {
                    form.reset()
                    alert(null, 'success', 'Registration successful')
                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()
        props.onLoginClick()
    }

    return <main className="justify-self-center">
        <h2>Sign up for Heartbeat</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput type="password" id="password" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Confirm password</Label>
                <PasswordInput type="password" id="password-repeat" />
            </Field>

            <PrimaryButton className="bg-pink" type="submit">Sign Up</PrimaryButton>
        </Form>

        <p>Already have an account?
            <a href="" onClick={handleLoginClick}> Log in instead</a>.
        </p>
    </main>
}