import { Anchor, Button, Field, Form, Input, Label } from './library'
import logic from "../logic"
import { errors } from 'com'

const { SystemError } = errors

export default function Register(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, email, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    alert('User successfully registered', 'success')

                    props.onRegistered()
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
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    const handlePartnerAccessClick = event => {
        event.preventDefault()

        props.onPartnerAccessClick()
    }

    return <main>
        <h2>Register</h2>

        <Form onSubmit={handleSubmit}>

            <Field>
                <Label htmlFor="name">First name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat password</Label>
                <Input type="password" id="password-repeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <Anchor href="" onClick={handleLoginClick}>Login instead</Anchor>
        <Anchor href="" onClick={handlePartnerAccessClick}>Secret code instead</Anchor>
    </main>
}